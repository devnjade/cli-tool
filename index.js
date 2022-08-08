#!/usr/bin/env node

import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';

let playerName;
let answer = ["ade", "tas", "temitope", "adebayo", "samuel"];
// let findAnswer = answer.find(i => i === playerName);

const sleep = (ms) => new Promise ((resolve) => setTimeout(resolve, ms));

async function start() {
  const title = chalkAnimation.rainbow(`Guess My Name :) \n`);

  await sleep(1000);
  title.stop();

  console.log(`
    ${chalk.yellow('Welcome to the game!')}
    ${chalk.yellow('Basically You Guess My Name And Win Nothing :)')}
  `);
}

async function askName() {
  const ask = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'Enter guess:',
  })

  return handleValidation(ask.name);
}

async function handleValidation(playerName) {
  const spinner = createSpinner('Loading...').start();
  await sleep(1000);


  if (answer.includes(playerName)) {
    spinner.success({ text: 'You Win!', color: 'green' });
  } else {
    spinner.fail({ text: 'You Lose!', color: 'red' });
    process.exit(1);
  }
}

function winner() {
  console.clear();
  const msg = `You Win! \n Nothing!`;

  figlet(msg, (err, data) => {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(gradient.pastel.multiline(data));
  });
}

await start();
await askName();
winner();