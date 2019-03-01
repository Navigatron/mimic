/*
file: index.js

purpose: Build the supporting infrastructure so mimic can function
Mimic needs:
 - Some way to save info between shutdowns
 - a connection to telegram

This file:
 - Loads the "database" - (It's just a json file)
 - Creates the connection to telegram
 - Saves the database file
*/

const config = {
	"database": "db.json",
	"auto-save": true,
	"auto-save-interval": 3600,
	"save-on-ctrlc": true
}

const fs = require("fs");
const slimbot = require("slimbot");
const key = require("./key.json").key;
const mimic = require("./mimic.js");

// Say hello!

console.log("\n=== Mimic! ===\n");

// Load the database file

let db;
try {
	let file_contents = fs.readFileSync(config.database);
	db = JSON.parse(file_contents);
	// If we get here, we've loaded the db.
	console.log("Database Loaded.");
	// Make a backup, so if we fuck this up, we can recover.
	fs.copyFile(config.database, config.database+".backup", (err) => {
	  if (err) throw err;
	  console.log('Database Backup Created.');
	});
} catch (err) {
	if (err.code === 'ENOENT') {
		console.warn("Couldn't open database file, starting from scratch.");
		db = {};
	}else{
		throw err;
	}
}

// Prepare everything needed to save the database file

function save(){
	let file_contents = JSON.stringify(db);
	fs.writeFileSync(config["database"], file_contents);
	console.log("Database has been Saved.");
}

function save_timer(){
	save();
	setTimeout(save_timer, config["auto-save-interval"]*1000);
}

if(config["save-on-ctrlc"]){
	console.log("Save on exit is ON - Press CTRL+C to save and exit.");
}

process.on('SIGINT', function() {
    if(config["save-on-ctrlc"]){
		console.log("\nCTRL+C detected, saving DB...");
		save();
	}
	console.log("Have a nice day!");
    process.exit();
});

if(config["auto-save"]){
	console.log("Auto Save is on");
	setTimeout(save_timer, config["auto-save-interval"]*1000);
}

// Here we are, the bread and butter.
let slimboi = new slimbot(key);
slimboi.on('message', message => {
	mimic.onMessage(slimboi, db, message);
});
console.log("Connecting to Telegram...");
slimboi.startPolling();
console.log("All systems go!");
