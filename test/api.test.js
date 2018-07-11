const { expect } = require('chai')
const { bot } = require('./test.config.js')




describe('api', () => {
  it('single call', async () => {
    const body = await bot.api('users.get', { user_ids: 1 })

    expect(body).to.deep.equal({
      response: [{
        id: 1,
        first_name: 'Павел',
        last_name: 'Дуров'
      }]
    })
  })
  it('execute', async () => {
    const results = await Promise.all([
      bot.execute('users.get', {
        user_ids: 1
      }),
      bot.execute('groups.isMember', {
        group_id: (await bot.getGroupId()),
        user_id: 1
      })
    ])

    expect(results).to.deep.equal([
      [
        {
          id: 1,
          first_name: 'Павел',
          last_name: 'Дуров'
        }
      ],
      0
    ])
  })
  it('calling execute method via .execute', async () => {
    const params = { }
    const result = await bot.execute('execute', { code: `return API.groups.getById(${JSON.stringify(params)});`})
    expect(result).is.a('array')
  })

  it('calling example method with incorrect options', async () => {
    try{
      const params = {
        group_ids: -1
      }
      const result = await bot.execute('execute', { code: `return API.groups.getById(${JSON.stringify(params)});`})
      
    }
    catch(e){
      expect(e).to.have.deep.property('error_code')
    }

  })
})