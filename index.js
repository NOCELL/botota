const methods = require('./lib/methods')

class Bot{
    constructor (settings) {
      const { token, v = 5.80, wait = 25, executeTimeout = 25, executePause = 50, lang = 'ru'} = settings
  
      if(!token) {
        throw new Error('token is required')
      }
      
      Object.assign(
        settings,
        { token, v , wait, executeTimeout, executePause, lang }
      )
      


      this.methods = []
      this.executePromises = {}
      this.execute_counter = 0
      this.actions = { messages: [],
                       any_messages: [],
                       edit_messages: [],
                       mentions: [],
                       chats: [],
                       users: [],
                       commands: [],
                       buttons: [],
                       events: []}
      this.settings = settings
  
      Object.assign(
        this,
        Object.entries(methods)
          .map(([ key, value ]) => ({ [key]: value.bind(this) }))
          .reduce((a, b) => ({ ...a, ...b }), {})
      )

      this.eventListener()
      this.executor()
      
    }


    event (event, callback) {
      return this.onEvent(event, callback)
    }
    message ( callback ) {
      return this.onMessage(callback)
    }

    command ( command, callback ) {
      return this.onCommand( command, callback)
    }

    use ( callback ) {
      return this.onUse(callback)
    }

    mention ( callback ) {
      return this.onMention(callback)
    }

    user ( callback ){
      return this.onUser( callback )
    }

    chat ( callback ){
      return this.onChat( callback )
    }

    edit ( callback ) {
      return this.onEdit(callback)
    }

    button ( button, callback) {
      return this.obButton(button, callback)
    }

    execute ( method_name, options ) {
      return this.execute(method_name, options)
    }

    api ( method_name, options ) {
      return this.api(method_name, options)
    }
  }



class User{
    constructor( settings ){
      const { token, v = 5.78, lang = 'ru'} = settings
  
      if(!token) {
        throw new Error('token is required')
      }
      this.api = methods.api.bind(this)
    }

    api ( method_name, options ){
      return this.api(method_name,options)
    }
}

class Streaming{

}


module.exports = { Bot, User, Streaming}