const TelegramBot = require('node-telegram-bot-api');
const print = require('./print.js');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;

console.log('Bot has been started....');

const bot = new TelegramBot(token, {
  polling: {
    interval: 300,
    autoStart: true,
    params: {
      timeout: 10
    }
  }
});

const send = function(chatId) {
  bot.sendPhoto(chatId, './year.png');
}

bot.onText(/\/year/, msg => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Заждіть трішки...');
  print.printYear(send.bind(null, chatId));
});