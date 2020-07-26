# Discord FishBoy Bot

A simple bot which creates a small fishing game in Discord chatroom

## Installation
Please follow the commands to generated Database entries and tables needed for the game

```bash
npm install
npm run migration
npm run seed
npm run start 
```

## Update List of Fish
We use a global Fish API to generate JSON file with Fishes which will be used to populate Database
 
To update the list please run this php command (**Warning: It will take very long time !** )

```bash
php scripts/buildFishJson.php
```

### Commands
- `botinfo`     - Show information about the bot
- `catch`       - Catch a fish and gather points based on what you caught
- `fish`        - Get information about a random fish in the database
- `scoreboard`  - Show top 5 players on the server
- `showplayers` - Show all players in the game on the server