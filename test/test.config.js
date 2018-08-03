const botota = require('../index.js')

if(process.env.token === undefined){
    console.error('Need access token for tests!\nSet the access token to the environment variable "token"\nhttps://vk.com/dev/access_token')
    process.exit(-1)
}
const bot = new botota.Bot({
    token: process.env.token,
    v: '5.80', /*
        that last major update of api version
        many api methods was changed
    */
    lang: 'ru' //by default VK set language by geo location of your IP-adress
})

module.exports = { bot }