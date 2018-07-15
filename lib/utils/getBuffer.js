const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs-extra')

module.exports = async (file) => {
    if( file instanceof Buffer ){
        return file
    }
    if( typeof file == 'string' ){
        if( file.startsWith('http') ){
            let bite_file = await axios.get(file, {
                responseType: 'arraybuffer'
            })
            let file_buffer = new Buffer.from(bite_file.data, 'binary')
            return file_buffer
        }
        else{
            return await fs.readFile(file)
        }
    }
}