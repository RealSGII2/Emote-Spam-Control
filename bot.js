// Getting variables
const Discord = require('discord.js');
const client = new Discord.Client();



// Settings
const limit = 3; // Limit for emote only messages
const allowedroles = ['0']; // IDs of the roles that are allowed to bypass


// Actual coding for the bot



// Log in the bot
client.user.login(process.env.token)
