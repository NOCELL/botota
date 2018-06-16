const { expect } = require('chai')
const { bot } = require('./test.config.js')
const peer_id = 225818028 //this VK user will always have access to private messages
const file = 'https://vk.com/images/gift/875/256_1.jpg' //this is a statics file for a gift


describe('Upload', () => {
  it('doc messages', async () => {
    const upload_doc = await bot.uploadDocMessages({
          file,
          peer_id
        })
    expect(upload_doc).to.have.deep.property('ext', 'jpg')
  })

  it('photo messages', async () => {
    const upload_photo = await bot.uploadPhotoMessages({
        file,
        peer_id
    })
    expect(upload_photo).to.have.deep.property('album_id', -64)
  })

})




  
  
  console.log()