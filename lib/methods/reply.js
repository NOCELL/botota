module.exports = async function (options ) {


    options.peer_id = this.from_id || this.user_id || ( this.chat_id + 2e9)


    if( options.attachment && options.attachment.length > 0){

        options.attachment = options.attachment.join(',')
    }
    if( options.forward_messages && options.forward_messages.length > 0){
        options.forward_messages = options.forward_messages.join(',')
    }
    
    if( options.keyboard != undefined ){
        options.keyboard.buttons.forEach( (method) => {
            method.forEach( (button) => {
                button.action.payload = JSON.stringify(button.action.payload)
            })
        })
        options.keyboard = JSON.stringify(options.keyboard)
    }
    try{
        var response = await this.execute('messages.send', options)
        return response
    }
    catch(e){
        throw (e)
    }
}