# Telegram DDOS Bot

This Python Telegram bot allows user to send a ddos attack via api

## Getting Started

These instructions will help you set up and run the bot.

### Prerequisites

1. Python
2. `python-telegram-bot` library: You can install it using pip:
   ```
   pip install python-telegram-bot
   ```

### Configuration

Create a `config.json` file with the following structure:

```json
{
  {
  "bot_token": "urtoken",
  "allowed_user_ids": [1234567, 9876543, 5555555],
  "available_methods": ["HTTP", "HTTPS",],
  "api_endpoints": {
    "HTTP": [
      "https://api.niqqa.com?api_key=myapikey&method=HTTP-SUPER&host={host}&time={time}",
      "https://api.blackpoeple.com?api_key=myapikey&method=HTTP-SUPER&host={host}&time={time}",
      "https://api.segs.com?api_key=myapikey&method=HTTP-SUPER&host={host}&time={time}"
    ]
    "HTTPS": [
      "https://api.niqqa.com?api_key=myapikey&method=HTTPS-SUPER&host={host}&time={time}",
      "https://api.blackpoeple.com?api_key=myapikey&method=HTTPS-SUPER&host={host}&time={time}",
      "https://api.segs.com?api_key=myapikey&method=HTTP-SUPER&host={host}&time={time}"
    ]
  }
}

```

- `bot_token`: Your Telegram bot token.
- `allowed_user_ids`: Authorized user IDs.
- `available_methods`: List of available attack methods.
- `api_endpoints`: Dictionary of API endpoints for each method.

### Running the Bot

1. Clone this repository:
   ```
   git clone https://github.com/Rvlndd/telegramddosbot
   ```

2. Navigate to the project directory:
   ```
   cd telegramddosbot
   ```

3. Start the bot:
   ```
   python teleddosbot.py
   ```

## Usage

- Authorized users can send attack requests using the `/attack` command with the format `/attack {HOST} {METHOD} {TIME}`.
- To view available methods, use the `/methods` command.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

Please replace placeholders like `urtoken` `api endpoint` and your `method list`
