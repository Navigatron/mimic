# Mimic Reborn

![](https://i.imgur.com/vgOA2zo.png)

Mimic generates new messages in group chats based on past messages.

### Usage

On Telegram, add @MimicBot to your groupchat.

Mimic learns from every message sent. Mimic might say boring or repetitive things at first - give mimic time. (Mimic does best after ~5000 messages. Send me a message and I'll pre-load your chat's history so you don't have to wait.)

- Messages to or from other bots will be ignored
- Messages that contain "mimic" will be responded to
- Messages that don't fit the above will be learned from.

### Privacy

Mimic has privacy mode set to *off*. This is necessary to learn from messages.

Mimic does not store your messages. Mimic only stores the relationships between words. For example:

```
"<start>:hello": {
	appearances: 3,
	ends: 1,
	next: {
		"there": 1,
		"hello": 1
	}
}
```

In the above example, mimic knows that there have been three sentences starting with hello. One ended immediately, one was followed by "there", and the last one repeated hello.

Mimic does not store any information about users. Please feel free to check the code and I'll help answer any questions.

### How about this code, eh?

1. Clone from github
2. Set the API key in `key.json`
4. `npm install` to install dependencies
5. `npm start`

### Configuration

- database
	- default: db.json
	- Tells what file to load and save everything to
- auto-save
	- default: true
	- Should the bot automatically save the database?
- auto-save-interval
	- default: 3600
	- Measured in seconds, 3600 = 1 hour
	- How often should the database be saved, if at all?
- save-on-ctrlc
	- When `CTRL+C` is pressed, what do?

### Files

- index.js
	- Loads db
	- Saves db
	- Connects to telegram
	- relays commands to mimic
- mimic.js
	- Handles messages and commands
- markov2.js
	- Enables the creation and generation from markov chains
- key.json
	- the API key

### Upcoming features

- Export telegram history and use it to jump-start models.
	- For now I'm manually adding histories - send me a message.
