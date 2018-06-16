const axios = require('axios')
const { stringify } = require('querystring')

module.exports = async function (method, options = {}) {
  if(!method){
    throw new Error('Need method\'s name for API calling!')
  }
  options.access_token = this.settings.token
  options.v = this.settings.v

  try{
    var { data } = await axios.post(`https://api.vk.com/method/${method}`, stringify(options) )
    var { error, response } = data

    if( error ){
      throw data.error
    }
    return data
  }
  catch( err ){
    throw (err)
  }
}