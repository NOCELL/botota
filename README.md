# botota.js

Botact enables developers to focus on writing reusable application logic instead of spending time building infrastructure.

## Table of content

- [Install](#install)
- [Usage](#usage)
- [Botact API](#botact-api)
- [Botact Flow API](#botact-flow-api)
- [TypeScript](#typescript)
- [Tests](#tests)
- [Donate](#donate-)
- [License](#license)

## Install

**via npm:**

```sh
$ npm i botota -s
```

**via yarn:**

```sh
$ yarn add botact
```

## Usage

```javascript
const botota = require('botota')

const bot = new botota({
  token: process.env.TOKEN
})

bot.command('/start', ({ reply }) => reply('This is start!'))
bot.hears(/(car|tesla)/, ({ reply }) => reply('I love Tesla!'))
bot.event('group_join', ({ reply }) => reply('Thanks!'))
bot.on(({ reply }) => reply('What?'))
```

## Botact API

## Methods

### Core

- [constructor(settings)](#constructorsettings)
- [.api(method, options)](#apimethod-settings)
- [.execute(method, settings)](#executemethod-settings-callback)
- [.reply({ peer_id, message, attachments, keyboard})](#replyuser_id-message-attachment-keyboard)

### Actions

- [.event(event, callback)](#beforecallback)
- [.command(command, callback)](#beforecallback)
- [.message(callback)](#beforecallback)
- [.use(callback)](#beforecallback)
- [.edit(callback)](#beforecallback)
- [.mention(callback)](#beforecallback)
- [.chat(callback)](#beforecallback)
- [.user(callback)](#beforecallback)

### Options

- [getGroupById)](#deleteoptionssettings)
- [[getter] options](#getter-options)
- [[setter] options](#setter-options)
- [.deleteOptions(settings)](#deleteoptionssettings)

### Upload helpers

- [.uploadDocMessages({file, peer_id ,type})](#uploaddocumentfile-peer_id-type)
- [.uploadPhotoMessages({file, peer_id, type})](#uploadcoverfile-settings)
- [.uploadDocument(file, peer_id ,type)](#uploaddocumentfile-peer_id-type)
- [.uploadPhoto(file, peer_id)](#uploadphotofile-peer_id)

--------------------------------------------------------------------------------

## Botact API: Core [↑](#botact-api)

### constructor(settings)

Create bot.

**Definition:**

```typescript
constructor (settings: {
  confirmation: string;   // required
  token: string;          // required
  group_id?: number;

  // Flow Settings
  flowTimeout?: number;   // Document expire time, in seconds
  redis?: boolean;        // false by default
  redisConfig?: object;   // {} by default
})
```

**Usage:**

```javascript
const { Botact } = require('botact')

const bot = new Botact({
  confirmation: process.env.CONFIRMATION,
  token: process.env.TOKEN
})
```

### .api(method, settings)

Call API method (<https://vk.com/dev/methods>).

**Definition:**

```typescript
async api (
  method: string,        // required
  options?: object,      // api call parameters
): Promise<any>;         // Promise with response/error
```

**Usage:**

```javascript
const user_data = await bot.api('users.get', {
  user_ids: 1
})
```

### .execute(method, settings, callback)

Call API by [execute](https://vk.com/dev/execute).

**Definition:**

```typescript
async execute (
  method: string,        // required
  options?: object,      // api call  parameters
  callback?: function    
): Promise<any>;         // Promise with response/error
```

**Usage:**

```javascript
bot.execute('users.get', {
  user_ids: 1
}, (body) => {
  // {
  //   response: [{
  //     id: 1,
  //     first_name: 'Павел',
  //     last_name: 'Дуров'
  //   }]
  // }
})
```

### .reply(user_id, message, attachment, keyboard)

Sends message to user

**Definition:**

```typescript
async reply ({
  user_id: number,
  message: string,      // required, if attachment not setten
  attachment: string,   // required, if message not setten
  keyboard: Object      // optional
}): Promise<any>         // Promise with reply message's id
```

**Usage:**

```javascript
bot.command('start', (ctx) => {
  // via shortcut from context
  ctx.reply('Hi, this is start!')
  // via shortcut with keyboard
  ctx.reply('Yo, this is keyboard?', null, {
    one_time: false,
    buttons: [
      [
        {
          action: {
            type: 'text',
            payload: {
              button: 'Hello, world!'
            },
            label: 'Hello, world!'
          },
          color: 'primary'
        }
      ]
    ]
  })
  // via function from context
  ctx.sendMessage(ctx.user_id, 'Hi, this is start!')
  // via function from instance
  bot.reply(ctx.user_id, 'Hi, this is start!')
  // to multiple users
  bot.reply([ ctx.user_id, 1 ], 'Hi, this is start!')
})
```

### .listen(req, res, callback)

Start listen [Express](https://github.com/expressjs/express/) server.

**Definition:**

```typescript
listen (
  req: any,           // Express request, required
  res: any            // Express response, required
  callback: function  // Callback for errors
)
```

**Usage:**

bot.listen(req, res, (error) => {
  res.status(500).json()
})
```javascript
```

## Botact API: Actions [↑](#botact-api)

### .before(callback)

Add callback before bot will start.

**Definition:**

```typescript
before (
  callback: function
)
```

**Usage:**

```javascript
bot.before(() => new Date())

bot.on(({ inital }) => {
  // Fri Nov 24 2017 16:00:21 GMT+0300 (MSK)
})
```

### .command(command, callback)

Add command w/ strict match.

**Definition:**

```typescript
command (
  command: string | string[],
  callback: function
): Botact
```

**Usage:**

```javascript
bot.command('start', ({ reply }) => reply('This is start!'))
```

### .event(event, callback)

Add [event](https://vk.com/dev/groups_events) handler .

**Definition:**

```typescript
event (
  event: string | string[],
  callback: function
): Botact;
```

**Usage:**

```javascript
bot.event('group_join', ({ reply }) => reply('Thanks!'))
```

### .hears(command, callback)

Add command w/ match like RegEx.

**Definition:**

```typescript
hears (
  hear: string | RegExp | (string | RegExp)[],
  callback: function
): Botact;
```

**Usage:**

```javascript
bot.hears(/(car|tesla)/, ({ reply }) => reply('I love Tesla!'))
```

### .on(type, callback)

Add reserved callback.

**Definition:**

```typescript
on (
  type: string,
  callback: function
): Botact;

OR

on (
  callback: function
): Botact;
```

**Usage:**

```javascript
bot.on(({ reply }) => reply('What?'))
bot.on('audio', ({ reply }) => reply('Great music!'))
```

### .use(callback)

Add middleware.

**Definition:**

```typescript
use (
  callback: function
): Botact
```

**Usage:**

```javascript
bot.use(ctx => ctx.date = new Date())

bot.on(({ date }) => {
  // Fri Nov 24 2017 16:00:21 GMT+0300 (MSK)
})
```

## Botact API: Options [↑](#botact-api)

### [getter] options

Get options.

```javascript
bot.options
// {
//   confirmation: '12345',
//   token: 'abcde...'
// }
```

### [setter] options

Set options.

```javascript
bot.options = { foo: 'bar' }
// {
//   confirmation: '12345',
//   token: 'abcde...',
//   foo: 'bar'
// }
```

### .deleteOptions(settings)

Delete keys settings.

**Definition:**

```typescript
deleteOptions (
  keys: string[]
): Botact
```

**Usage:**

```javascript
bot.deleteOptions([ 'token', 'confirmation' ])
// {
//   foo: 'bar'
// }
```

## Botact API: Upload helpers [↑](#botact-api)

### .uploadCover(file, settings)

Upload and save cover. See detailed settings [here](https://vk.com/dev/photos.getOwnerCoverPhotoUploadServer).

**Definition:**

```typescript
async uploadCover (
  filepath: string,    // Path to file with cover
  settings?: object
): Promise<any>        // Promise with response/error
```

**Usage:**

```javascript
await bot.uploadCover('./cover.jpg', { crop_x2: 1590 })
// {
//   images: [
//     {
//       url: "URL",
//       width: 1920,
//       height: 1080
//     },
//     [Object],
//     [Object],
//     [Object],
//     [Object]
//   ]
// }
```

### .uploadDocument(file, peer_id, type)

Uploads document to peer.

**Definition:**

```typescript
async uploadDocument (
  filepath: string,               // Path to file
  peer_id: number,
  type: 'doc' | 'audio_message'   // 'doc' by default
): Promise<any>;                  // Promise with response/error
```

**Usage:**

```javascript
await bot.uploadDocument('./book.pdf', 1234)
// {
//   response:
//     [{
//       id: 1234,
//       owner_id: 1234,
//       title: "",
//       ...
//     }]
// }
```

### .uploadPhoto(file, peer_id)

Uploads photo to peer.

**Definition:**

```typescript
async uploadPhoto (
  filepath: string,   // Path to picture
  peer_id: number
): Promise<any>       // Promise with response/error
```

**Usage:**

```javascript
await bot.uploadPhoto('./picture.png', 1234)
// {
//   id: 1234,
//   album_id: 1234,
//   owner_id: 1234,
//   ...
// }
```

--------------------------------------------------------------------------------

## Botact Flow API

### Usage

```javascript
const bot = new Botact({
  ...,
  redis: true       // enable redis
  flowTimeout: 20   // timeout for delete documents
  redisConfig: {    // redis config
    port: 1234
  }
})
```

```sh
$ redis-server
```

### Methods

- [.addScene(name, ...callbacks)](#addscenename-callbacks)
- [.joinScene(ctx, scene, session, step, now)](#joinscenectx-scene-session-step-now)
- [.nextScene(ctx, body)](#nextscenectx-body)
- [.leaveScene(ctx)](#leavescenectx)

### Example

```javascript
const bodyParser = require('body-parser')
const express = require('express')
const { Botact } = require('botact')

const app = express()
const bot = new Botact({
  confirmation: process.env.CONFIRMATION,
  token: process.env.TOKEN,
  redis: true,
  flowTimeout: 20,      // document will be deleted after 20 secs
  redisConfig: {
    host: '127.0.0.1',  // default host for redis
    port: 8080          // custom port for redis
  },
})

bot.addScene('wizard',
  ({ reply, scene: { next } }) => {
    next()
    reply('Write me something!')
   },
  ({ reply, body, scene: { leave } }) => {
    leave()
    reply(`You wrote: ${body}`)
  }
)

bot.command('join', ({ scene: { join } }) => join('wizard'))

app.use(bodyParser.json())
app.post('/', bot.listen)
app.listen(process.env.PORT)
```

## Botact Flow API: Methods

### .addScene(name, ...callbacks)

Add scene.

**Definition:**

```typescript
addScene (
  name: string,
  ...args: function[]
): Botact;
```

**Usage:**

```javascript
bot.addScene('wizard',
  ({ reply, scene: { next } }) => {
    next()
    reply('Write me something!')
  },
  ({ reply, body, scene: { leave } }) => {
    leave()
    reply(`You wrote: ${body}`)
  }
)
```

### .joinScene(ctx, scene, session, step, now)

Enter scene.

**Definition:**

```typescript
async joinScene (
  ctx: object,
  scene: string,
  session?: object,      // {} by default
  step?: number,         // 0 by default
  instantly?: boolean    // true by default
): Promise<Botact>;
```

**Usage:**

```javascript
bot.command('join', (ctx) => {
  // with shortcut without additional settings
  ctx.scene.join('wizard')
  // simple usage with additional settings
  bot.joinScene(ctx, 'wizard', { foo: 'bar' })
})
```

### .nextScene(ctx, body)

Navigate scene.

**Definition:**

```typescript
async nextScene (
  ctx: object,
  session?: object,      // {} by default
): Promise<Botact>;
```

**Usage:**

```javascript
bot.addScene('wizard',
  (ctx) => {
    // with shortcut without additional settings
    ctx.scene.next({ foo: 'bar' })
    // simple usage with additional settings
    bot.nextScene(ctx, { foo: 'bar' })
  }
)
```

### .leaveScene(ctx)

Leave scene.

**Definition:**

```typescript
async leaveScene(
  ctx: object
): Promise<Botact>;
```

**Usage:**

```javascript
bot.addScene('wizard',
  (ctx) => {
    // with shortcut
    ctx.scene.leave()
    // simple usage
    bot.leaveScene(ctx)
  }
)
```

--------------------------------------------------------------------------------

## TypeScript

Botact includes [TypeScript](https://www.typescriptlang.org/) definitions.

## Tests

**via npm:**

```sh
$ npm test
```

**via yarn:**

```sh
$ yarn test
```

## License

MIT.