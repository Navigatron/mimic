/*
file: index.js, but should be called mess.js

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
	db = fs.readFileSync(config.database);
	// If we get here, we've loaded the db.
	// Make a backup, so if we fuck this up, we can recover.
	fs.copyFile(config.database, config.database+".backup", (err) => {
	  if (err) throw err;
	  console.log('DB Loaded, backup created.');
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
	fs.writeFile(config["database"], db, function(err) {
	    if (err) {
	        console.error(err);
	    }
	});
}

function save_timer(){
	save();
	setTimeout(save_timer, config["auto-save-interval"]*1000);
}

process.on('SIGINT', function() {
    if(config[save-on-ctrlc]){
		console.log("CTRL+C detected, saving DB");
		save();
	}
    process.exit();
});

if(configuration["auto-save"]){
	setTimeout(save_timer, config["auto-save-interval"]*1000);
}

// Here we are, the bread and butter.
let slimboi = new slimbot(key);
slimboi.on('message', message => {
	mimic.onMessage(slimboi, db, message);
});
slimboi.startPolling();
console.log("All systems go!");
