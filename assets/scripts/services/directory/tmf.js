export default {
  title: 'TM Forum OpenAPIs',
  subTitle: 'Open APIs published by the TM Forum',
  home: 'https://github.com/SOM-Research/hapi',
  base: 'https://api.github.com/repos/SOM-Research/hapi/git/trees/8176cf7977ca59cab643136fd70632a65aee900b',
  transform (data) {
    const apis = [
      {
        'url': 'https://raw.githubusercontent.com/tmforum-apis/TMF669_PartyRole/master/Party_Role_Management.admin.swagger.json',
        'key': 'TMF669',
        'title': 'Party Role'
      },
      {
        'url': 'https://raw.githubusercontent.com/tmforum-apis/TMF671_Promotion/master/Promotion_Management.admin.swagger.json',
        'key': 'TMF671',
        'title': 'Promotion'
      }
    ]

    console.log(JSON.stringify(apis))

    return {apis}
  }
}
