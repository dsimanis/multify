#!/usr/bin/env node

const yargs = require("yargs");
const publishFcm = require("./service/fcm");

// Read message from command line
const options = yargs
 .usage("Usage: -m <message>")
 .option("m", { alias: "message", describe: "Message to send to a topic", type: "string", demandOption: true })
 .argv;

publishFcm('alertChannel', options.message);

