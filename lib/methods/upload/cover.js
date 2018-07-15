const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const utils = require('../../utils')

module.exports = async function (file, options = {}) {
      let group_id = await this.getGroupId()


      let response = await this.execute('photos.getOwnerCoverPhotoUploadServer', Object.assign(
          {group_id: group_id},
          options
      ))
      
      let ext = (typeof file == 'string' ? file.split('/').slice(-1)[0] : options.file_ext )
      if(!ext){
        throw new Error('Need file\'s extension!')
      }

      let filename = (typeof file == 'string' ? ( file.split('/'[-1]) ) : ('unknown.jpg') )
      let { upload_url: url } = response
      let form = new FormData()
      let file_buffer = await utils.getBuffer(file)
      form.append('file', file_buffer, { filename : `${file}` })
      const { data } = await axios.post(
        url,
        form,
        {
          headers: form.getHeaders()
        }
      )
      let save_result = await this.execute('photos.saveOwnerCoverPhoto', data)

      return save_result
}