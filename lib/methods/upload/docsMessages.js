const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const utils = require('../../utils')

module.exports = async function ({file, type = 'doc', peer_id, file_name}) {

      var peer_id = ( this.chat_id + 2e9) || this.from_id || this.user_id || peer_id
      
      var response = await this.execute('docs.getMessagesUploadServer', {
        type,
        peer_id
      })
      
      var filename = filename || (typeof file == 'string' ? ( file.split('/').slice(-1)[0] ) : ('unknown.type') )

      var { upload_url: url } = response

      var form = new FormData()

      
      var file_buffer = await utils.getBuffer(file)

      form.append('file', file_buffer, { filename : `${file}` })

      const { data } = await axios.post(
        url,
        form,
        {
          headers: form.getHeaders()
        }
      )

      var save_result = await this.execute('docs.save', data)

      return save_result[0]
}