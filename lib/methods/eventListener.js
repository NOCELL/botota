const axios = require('axios')


module.exports = async function () {
    const group_id = (await this.api('groups.getById')).response[0].id
    let { key, server, ts } = (await this.api('groups.getLongPollServer',{ group_id: group_id })).response
    while(true){
        try{
            let { data : events } = await axios.get(`${server}?act=a_check&key=${key}&ts=${ts}&wait=${this.settings.wait}`)
            if( events.failed !== undefined) {
                let longpoll = (await this.api('groups.getLongPollServer',{ group_id: group_id })).response
                key = longpoll.key
                server = longpoll.server
                ts = longpoll.ts
            }
            ts = events.ts
           
            let { updates } = events
            updates.forEach(async (update, i, arr) => {
                update.object.reply = require('./reply').bind(Object.assign(this, update.object))
                if( update.object.payload){
                    update.object.payload = JSON.parse(update.object.payload )
                }

                this.actions.events.forEach( async (eventHandler, i, arr) => {
                    if(update.type === eventHandler.event_name)
                        eventHandler.callback(update.object)
                })
                switch(update.type) {
                    case 'message_new': {
                        this.actions.messages.forEach( async (callback, i, arr) => {
                            callback(update.object)
                        })
                        this.actions.commands.forEach( async (commandHandler, i, arr) => {
                            if(update.object.text.toLowerCase().startsWith(commandHandler.command))
                                commandHandler.callback(update.object)
                        })
                        this.actions.users.forEach( async (callback, i, arr) => {
                            if( update.object.chat_id == undefined)
                                callback(update.object)
                        })

                        this.actions.buttons.forEach( async (button, i, arr) => {
                            if( JSON.stringify(update.object.payload) === JSON.stringify(button.button))
                                button.callback(update.object)
                        })

                        this.actions.chats.forEach( async (callback, i, arr) => {
                            if( update.object.chat_id != undefined)
                                callback(update.object)
                        })

                        this.actions.mentions.forEach( async (mentionHandler, i, arr) => {
                            if(update.object.peer_id && update.object.text.toLowerCase().indexOf( `[club${group_id}|`) != -1) 
                                mentionHandler(update.object)
                        })
                        
                    }
                    case 'message_reply': {
                        this.actions.any_messages.forEach( async (callback, i, arr) => {
                            callback(update.object)
                        })
                    }
                    case 'message_edit': {
                        this.actions.edit_messages.forEach( async (callback, i, arr) => {
                            callback(update.object)
                        })
                    }
                    
                }
            });
        }
        catch(error){
            console.error(error)
        }
    }
}