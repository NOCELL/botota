const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const utils = require('../../utils')

module.exports = async function (file, options = {}) {
      var group_id = await this.getGroupId()


      var response = await this.execute('photos.getOwnerCoverPhotoUploadServer', Object.assign(
          {group_id: group_id},
          options
      ))
      
      var ext = (typeof file == 'string' ? file.split('/').slice(-1)[0] : options.file_ext )
      if(!ext){
        throw new Error('Need file\'s extension!')
      }

      var filename = (typeof file == 'string' ? ( file.split('/'[-1]) ) : ('unknown.jpg') )
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
      var save_result = await this.execute('photos.saveOwnerCoverPhoto', data)

      return save_result
}