#!/usr/bin/env node

const yargs = require("yargs");
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');
const {publishFcm} = require("./service/fcm");
const {publishSns, createTopicSns} = require("./service/sns");

clear();

console.log(
  chalk.cyanBright(
    figlet.textSync('Multify', { horizontalLayout: 'full' })
  )
);

function collectInput() {
  const questions = [
    {
      name: 'platform',
      type: 'input',
      message: 'Enter messaging platform name: ',
      validate: function( value ) {
        if (value.length) {
          return true;
        } else {
          return "Please enter 'fcm' or 'sns': ";
        }
      }
    },
    {
      name: 'topic',
      type: 'input',
      message: 'Enter pub-sub topic name: ',
      validate: function(value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter topic name to send messages to: ';
        }
      }
    },
    {
      name: 'message',
      type: 'input',
      message: 'Enter the message: ',
      validate: function(value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter the message: ';
        }
      }
    }
  ];
  return inquirer.prompt(questions);
}

const main = async () => {
  const input = await collectInput();

  if(input.platform === 'fcm') {
    publishFcm(input.topic, input.message);
  } else if (input.platform === 'sns'){
      publishSns(input.topic, input.message);
  } else {
      console.log(`Platform has to be either 'fcm' or 'sns'`);
  }
};

main();

/* const options = yargs
  .usage("Usage: -p <platform> -t <topic> -m <message>")
  .option("p", { alias: "platform", describe: "FCM or SNS", type: "string", demandOption: true })
  .option("t", { alias: "topic", describe: "Topic name", type: "string", demandOption: true })
  .option("m", { alias: "message", describe: "Message to send to a topic", type: "string", demandOption: true })
  .argv;

if(options.p === 'fcm') {
    publishFcm(options.t, options.message);
} else if (options.p === 'sns'){
    publishSns(options.t, options.message)
} else {
    console.log(`Platform need to be either 'fcm' or 'sns'`);
} */