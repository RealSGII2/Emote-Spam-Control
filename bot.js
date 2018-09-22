// Getting variables
const Discord = require('discord.js');
const client = new Discord.Client();


// Settings
const limit = 3; // Limit for emote only messages
const allowedroles = ['0']; // IDs of the roles that are allowed to bypass
let prefix = "!";

// Actual coding for the bot
client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(prefix) !== 0) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase()
  
  if (command === 't' || command === 'tag') {
    const tagname = args.shift()
    if (tagname === 'all') {
      message.channel.send({embed: {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "All Tags",
        description: "\n",
        fields: [{
            name: "\n",
            value: "globalsnotworking, noglobalshere, expiredinvite, mentions, mixeremotes"
          },
        ],
        timestamp: new Date(),
        footer: {
        icon_url: message.author.avatarURL,
        text: `Requested by ${message.author.tag}`
        }
      }
    });
    }
    
  if (tagname === 'globalsnotworking') {
   message.channel.send({embed: {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "Why aren't the Global Emotes working even though I joined the server?",
        description: "\n",
        fields: [{
            name: "\n",
            value: "Emotes failing to work depends on the integration: GameWisp requires you to have a role on the server--some global emote servers will automatically give you this role. If the role isn't automatically given, you'll have to add it yourself manually. If you've met the above requirement, you may need to restart your discord. Mixer emotes servers, and BTTV emote servers require none of this hassle."
          },
        ],
        timestamp: new Date(),
        footer: {
        icon_url: message.author.avatarURL,
        text: `Tag name: globalsnotworking`
        }
      }
    }); 
  }
    
 if (tagname === 'noglobalshere') {
   message.channel.send({embed: {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "Why aren't the global emotes on here working?",
        description: "\n",
        fields: [{
            name: "\n",
            value: "This server does not have global emotes; we list servers that have them. If you want to donate, so we can get global emotes, send me a direct message."
          },
        ],
        timestamp: new Date(),
        footer: {
        icon_url: message.author.avatarURL,
        text: `Tag name: noglobalshere`
        }
      }
    });
 }
    
 if (tagname === 'pings' || tagname === 'mentions') {
   message.channel.send({embed: {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "How do I stop a server from pinging me?",
        description: "\n",
        fields: [{
            name: "\n",
            value: "If the owner of the server is doing (@)everyone or (@)here, you can right-click the server icon and click Notification Settings then choose mute server and suppress (@)everyone and (@)here. If the owner is tagging a role, check if the role is self-assignable and remove the role using the command for the said bot."
        },
        ],
        timestamp: new Date(),
        footer: {
        icon_url: message.author.avatarURL,
        text: `Tag name: pings`
        }
      }
    });
 }
    
  if (tagname === 'expiredinvite') {
   message.channel.send({embed: {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "Why is the global emote server's invite expired for me?",
        description: "\n",
        fields: [{
            name: "\n",
            value: "One of the main reasons is that the invite is just expired, but another reason is that you're on 100 servers, and you need to leave a few, so the invites aren't expired. There's a chance that you were banned from the server because someone listed you on the user-made discord ban database used by bots like ServerHound."
        },
        ],
        timestamp: new Date(),
        footer: {
        icon_url: message.author.avatarURL,
        text: `Tag name: expiredinvite`
        }
      }
    });
 }
    
 if (tagname === 'mixeremotes') {
   message.channel.send({embed: {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "Why is the global emote server's invite expired for me?",
        description: "\n",
        fields: [{
            name: "\n",
            value: "Mixer, just like GameWisp and BTTV are discord integrations that give servers the ability to have global emotes. Unfortunately, the Mixer integration is terrible and leads to small-sized emotes becoming enlarged on Discord causing them to look like pixelated trash."
        },
        ],
        timestamp: new Date(),
        footer: {
        icon_url: message.author.avatarURL,
        text: `Tag name: mixeremotes`
        }
      }
    });
 }
  }
});


// Log in the bot
client.user.login(process.env.token)
