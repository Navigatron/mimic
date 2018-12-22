// HENLO I AM MIMIC

/*

file: mimic.js

This file lives and breathes to support a single function: onMessage.

Whenever anything happens to mimic on telegram, onMessage is called with
everything we could ever need.

*/

module.exports.onMessage = function onMessage(bot, db, message){
	if(message.text){
		if(typeof(message.text)==="string"){
			console.log("Got message: \""+message.text+"\"");
			// This comment is part two of key ignore testing.
		}
	}
}
