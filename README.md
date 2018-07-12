# botota

Framefork for creating Bots in social network VK.com

## Usage

```javascript
const botota = require('botota')
const bot = new botota.Bot({
    token: "afbd70140d0b9cf4fa8ddbsbdf219k3b7073cc90cc89752baaa6aad5as0fa333se91c30b8an1k75ds7d2d", //example token
    v: '5.80', //version API, STRING type!
})


bot.on( (msg) => {
    msg.reply({
        text: 'Hello World!'
    })
})

bot.command('tick', (msg) => {
    msg.reply({
        text: 'tack'
    })
})

bot.event('group_join', (event) => {
    event.reply({
        text: 'Thank for subscribe!'
    })
}

```

## API callings

## .api

```
.api(method_name, params)
```

#### Usage
``` javascript
...
(async() =>{
   const messages = await bot.api('messages.getById', {
       message_ids: [1,2,3,4,5]
   }) 
})()
```



## .execute

```
.execute(method_name, params)
```

#### Usage
``` javascript
...
(async() => {
   const chat = await bot.execute('messages.getChat', {
       chat_id: 42
   }) 
})()
```

# Events

```javascript
.event(event_name, callback)
```
Callback any [Callback API](https://vk.com/dev/callback_api) event

```javascript
.on(callback)
```
Callback any incoming message

```javascript
.use(callback)
```
Callback any new message

```javascript
.command(command, callback)
```
Callback any incoming message which starts with command

```javascript
.mention(callback)
```
Callback any incoming message where the group is mentioned

```javascript
.chat(callback)
```
Callback any incoming message from chats

```javascript
.user(callback)
```
Callback any incoming message from users




