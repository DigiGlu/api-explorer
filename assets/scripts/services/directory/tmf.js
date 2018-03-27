export default {
  title: 'TM Forum OpenAPIs',
  subTitle: 'Open APIs published by the TM Forum',
  home: 'https://github.com/tmforum-apis',
  base: 'https://raw.githubusercontent.com/DigiGlu/tmf-api-directory/master/open-api-directory',
  transform (data) {
    const apis = data
    return {apis}
  }
}
