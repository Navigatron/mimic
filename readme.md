# Mimic Reborn

Mimic generates new messages in group chats based on past messages.

### Usage

On Telegram, add @MimicBot to your groupchat.

`/mimic` - generate a message based on everyone

Mimic learns from every message sent. Mimic might say boring or repetitive things
at first - give mimic time.

### How it works

Mimic stores n+1 sets of models, where n is the number of people in the groupchat and
the +1 represents the group as a whole.

Each set contains an order-1 and an order-2 markov chain.

When a message is sent, the message is integrated into the group set and the set
of the individual who sent the message.

When `/mimic` is used, mimic selects the set to draw from, and then the order-1
or order-2 chain based on the number of messages integrated.

### How about this code, eh?

1. Clone from github
2. Set the API key in `api_key.js`
3. Review configuration in `config.json` and below
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
