// HENLO I AM MIMIC

/*

file: mimic.js

This file lives and breathes to support a single function: onMessage.

Whenever anything happens to mimic on telegram, onMessage is called with
everything we could ever need.

*/

const markov = require("./markov2");

const NO_CHAIN_WARNING = "Warning: No data model for this chat. I've just created one - let me listen for a while and I'll be ready to respond."

const EMPTY_CHAIN_WARNING = "Warning: The data model for this chat is empty. Let me listen for a while and I'll be ready to respond.";

/*
Name: onMessage
Desc: Mimic has heard a message. decide what to do with it, based on these three mutually exclusive options:
	- Ignore commands to other bots
	- Respond to "mimic"
	- Learn from messages
Args:
	- bot: Connection to Telegram
	- db: The database
	- message: The message object that was recieved
*/
module.exports.onMessage = function onMessage(bot, db, message){

	// Video, voice, stickers - these are messages we can't do anything with.
	if(!message.text){
		return;
	}

	// Rule 1 - Ignore commands to other bots.
	// Though we may implement commands for ourself later
	if(message.text.charAt(0)==='/'){
		onCommand(bot, db, message);
		return;
	}

	// Rule 2 - Respond to messages that contain "mimic"
	if(message.text.toLowerCase().includes("mimic")){
		respond(bot, db, message);
		return;
	}

	// Rule 3 - Learn from the message
	let chatID = message.chat.id;
	if(!db[chatID]){
		// Create new chain for this chat
		db[chatID] = markov.create_chain();
	}
	markov.merge_sentence(db[chatID], message.text);
}

/*
name: onCommand
desc: Mimic heard a command - what do?
args:
	- bot: a reference to a slimbot instance. This is our connection back to telegram.
	- db: the big file of data.
	message - the message that was heard
*/
function onCommand(bot, db, message){
	// Split the text into tokens, test against my commands.
	let t = message.text.toLowerCase().split(" ");
	if(t[0]==="/mimic" || t[0]==="/mimic@mimicbot"){
		//console.log("Got Command! Yay! \""+message.text+"\"");
		//bot.sendMessage(message.chat.id,"That's my name, don't wear it out.");
		return;
	}else{
		// This command is not for me.
		return;
	}
}

/*
Data structure:

db = {
	CHATID: MARKOVCHAIN,
};
*/

/*
Name: respond
Desc: Generate a response for this chat, send it.
Args:
	- bot: The connection to telegram
	- db: The database
	- message: The message object that prompted this reply.
*/
function respond(bot, db, message){
	// Extract chatID
	let chatID = message.chat.id;

	if(db[chatID]){
		// generate and send a response
		let response = markov.generate(db[chatID]);
		if(response === -1){
			bot.sendMessage(EMPTY_CHAIN_WARNING);
		}else{
			bot.sendMessage(chatID, response);
		}
	}else{
		// Create chain, say sorry for no data.
		db[chatID] = markov.create_chain();
		bot.sendMessage(NO_CHAIN_WARNING);
	}
}
