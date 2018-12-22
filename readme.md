# Mimic Reborn

Mimic generates new messages in group chats based on past messages.

### Usage

On Telegram, add @MimicBot to your groupchat.

`/mimic` - generate a message

Mimic learns from every message sent. Mimic might say boring or repetitive things
at first - give mimic time.

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

### Upcoming features

`/mimic @user`

Export telegram history and use it to jump-start models.
