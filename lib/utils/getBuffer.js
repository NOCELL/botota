const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs-extra')

module.exports = async function (file) {
    if( file instanceof Buffer ){
        return file
    }
    if( typeof file == 'string' ){
        if( file.startsWith('http') ){
            var bite_file = await axios.get(file, {
                responseType: 'arraybuffer'
            })
            var file_buffer = new Buffer(bite_file.data, 'binary')
            return file_buffer
        }
        else{
            return fs.readFile(file)
        }
    }
}