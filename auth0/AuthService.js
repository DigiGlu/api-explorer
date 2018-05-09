/* eslint-disable */

import auth0 from 'auth0-js'
import { AUTH_CONFIG } from './auth0-variables'
import EventEmitter from 'eventemitter3'

export default class AuthService {
  authenticated = this.isAuthenticated()
  profile = this.getProfile()
  authNotifier = new EventEmitter()

  constructor () {
    this.login = this.login.bind(this)
    this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.getProfile = this.getProfile.bind(this)
  }

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    //audience: 'https://digiglu.eu.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid user_metadata app_metadata'
  })
//  AUDIENCE SHOULD BE SPECIFIED (REMOVED FOR SIMPLICITY)
//  audience: `https://${AUTH_CONFIG.domain}/userinfo`,

  login () {
    this.auth0.authorize()
  }

  handleAuthentication (router) {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.setUserInfo(authResult.accessToken);
        if (router) {
          router.push("/")
        }
      } else if (err) {
        console.log(err)
        alert(`Error: ${err.error}. Check the console for further details.`)
      }
    })
  }

  // REFACTORING: user info is actually already included in auth - so below is not needed
  setUserInfo( accessToken ) {
    this.auth0.client.userInfo( accessToken, (err, user) => {
      localStorage.setItem('profile', JSON.stringify(user));
      this.authNotifier.emit('profileChange', { profile: user })
    })
  }

  setSession (authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    this.authNotifier.emit('authChange', { authenticated: true })
  }

  logout () {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('profile')
    this.userProfile = null
    this.authNotifier.emit('authChange', { authenticated: false })
  }

  isAuthenticated () {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  getProfile () {
    return JSON.parse(localStorage.getItem('profile'))
  }
}
