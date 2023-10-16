```markdown
# Telegram DDos Bot

## Features

- Authorized users can initiate attacks using different methods.
- Using API
- Error handling for unauthorized users and invalid input.
- Configurable through `config.json`.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- A Telegram bot created using the BotFather on Telegram.
- Bot token, allowed user IDs, and API endpoints configured in `config.json`.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Rvlndd/teleddosbot
   ```

2. Change to the project directory:

   ```bash
   cd teleddosbot
   ```

3. Install the required packages:

   ```bash
   npm install
   ```

4. Configure your `config.json` file with your bot token, allowed user IDs, and API endpoints.

## Usage

1. Start the bot:

   ```bash
   node teleddosbot.js
   ```

2. Open your Telegram app and start a chat with your bot.

3. Use the following commands:

   - `/start` or `/help`: Display the welcome message.
   - `/attack {HOST} {METHOD} {TIME}`: Initiate an attack.
   - `/methods`: Display available attack methods.

## Configuration

Make sure to configure the `config.json` file with your bot token, allowed user IDs, and API endpoints. Here's an example configuration:

```json
{
  "bot_token": "urtoken",
  "allowed_user_ids": [123456, 789012],
  "available_methods": ["method1", "method2"],
  "api_endpoints": {
    "method1": "https://example.com/method1?host={host}&time={time}",
    "method2": "https://example.com/method2?host={host}&time={time}"
  }
}
```
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
