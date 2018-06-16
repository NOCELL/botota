const { expect } = require('chai')
const { bot } = require('./test.config.js')




describe('Utils', () => {
    describe('getBuffer', () => {
        it('from URL', async () => {
            const upload_doc = await bot.getBuffer('https://vk.com/images/gift/875/256_1.jpg')
            expect(upload_doc).to.be.instanceof(Buffer)
          })
          it('from file', async () => {
            const upload_doc = await bot.getBuffer('https://vk.com/images/gift/875/256_1.jpg')
            expect(upload_doc).to.be.instanceof(Buffer)
          })
          it('from buffer', async () => {
            const example_buffer = new Buffer('Hello world!', 'utf8')
            const upload_doc = await bot.getBuffer(example_buffer)
            expect(upload_doc).to.be.instanceof(Buffer)
          })
    })
})