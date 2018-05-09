export default {
  title: 'TM Forum WIP',
  subTitle: 'TMF APIs - unpublished',
  home: 'https://github.com/tmforum-apis',
  base: 'https://raw.githubusercontent.com/DigiGlu/tmf-api-directory/master/wip-api-directory.json',
  transform (data) {
    var apis = data

    apis.forEach(a => {
      a.url = a.url + '?token=' + localStorage.getItem('access_token')
    })
    return {apis}
  }
}
