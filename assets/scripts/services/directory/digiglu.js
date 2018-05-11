export default {
  title: 'digiglu APIs',
  subTitle: 'digiglu REST APIs',
  home: 'https://github.com/DigiGlu',
  base: 'https://raw.githubusercontent.com/DigiGlu/digiglu-api-directory/master/digiglu-api-directory.json',
  transform (data) {
    const apis = data
    return {apis}
  }
}
