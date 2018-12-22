// HENLO I AM MIMIC

/*

file: mimic.js

This file lives and breathes to support a single function: onMessage.

Whenever anything happens to mimic on telegram, onMessage is called with
everything we could ever need.

*/


module.exports.onMessage = function onMessage(bot, db, message){

	// Video, voice, stickers - there are messages we can't do anything with.
	if(!message.text){
		return;
	}

	// The majority of messages will just be text. Check for the alternate
	// Hypothesis, a command.
	if(message.text.charAt(0)==='/'){
		onCommand(bot, db, message);
		return;
	}

	// This is a message. Let's do something about that.
	console.log("Got message: \""+message.text+"\"");
}

/*
name: onCommand
desc: Mimic heard a command - what do?
args:
	bot - a reference to a slimbot instance. This is our connection
		back to telegram.
	db - the big file of data.
	message - the message that was heard.
returns: none.
*/
function onCommand(bot, db, message){
	// We can assume that message has a text field, that starts with /
	// t stands for tokens
	let t = message.text.toLowerCase().split(" ");
	if( !( t[0]==="/mimic" || t[0]==="/mimic@mimicbot" ) ){
		// This command is not for me.
		console.log("Got Command for not me: \""+message.text+"\"");
		return;
	}
	console.log("Got Command! Yay! \""+message.text+"\"");
	bot.sendMessage(message.chat.id,"That's my name, don't wear it out.");
}
