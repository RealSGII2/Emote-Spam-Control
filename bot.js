// Getting variables
const Discord = require('discord.js');
const client = new Discord.Client();


// Settings
const limit = 3; // Limit for emote only messages
const allowedroles = ['0']; // IDs of the roles that are allowed to bypass
let prefix = "$";

// Actual coding for the bot
client.on("ready", () => {
    client.user.setGame("around with testers");
    console.log("GEH Helper has started!")
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(prefix) !== 0) return;
  
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase()
  
  if (command === 'ping') {
   const m = await message.channel.send("Pinging...");
    m.edit(`Pong! ${Math.round(client.ping)}ms`); 
  }
  
  if (command === 'stats' || command === 'status') {
   let avatar = client.users.get(258706134850863106).avatarURL;
   
   let totalSeconds = (client.uptime / 1000);
   let hours = Math.floor(totalSeconds / 3600);
   totalSeconds %= 3600;
   let minutes = Math.floor(totalSeconds / 60);
   let seconds = Math.round(totalSeconds % 60);
   
   let uptime = `${hours} hours, ${minutes} minutes and ${seconds} seconds`;
   
   const embed = new Discord.RichEmbed()
  .setTitle("Stats")
  .setAuthor("GEH Helper", client.user.avatarURL)
  .setColor(3447003)
  .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL)
  .setThumbnail(avatar)
  .setTimestamp()
  .addField("Owner", "Omnidroid v10 • SGII2#2990", true)
  .addField("Uptime", uptime, true)
  .addField("Users", client.users.size, true)
  .addField("Servers", client.guilds.size, true)

  message.channel.send({embed});
 
  }
  
  if (command === 't' || command === 'tag') {
    const tagname = args.shift()
    if (tagname === 'all') {
      message.channel.send({embed: {
        color: 3447003,
        description: "\n",
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        fields: [{
            name: "All Tags",
            value: "globalsnotworking, noglobalshere, expiredinvite, mentions, mixeremotes"
          },
        ],
        footer: {
        icon_url: message.author.avatarURL,
        text: `Requested by ${message.author.tag}`
        }
      }
    });
    }
    
  else if (tagname === 'globalsnotworking') {
   message.channel.send({embed: {
        color: 16562432,
        description: "\n",
        fields: [{
            name: "Why aren't the Global Emotes working even though I joined the server?",
            value: "Emotes failing to work depends on the integration: GameWisp requires you to have a role on the server--some global emote servers will automatically give you this role. If the role isn't automatically given, you'll have to add it yourself manually. If you've met the above requirement, you may need to restart your discord. Mixer emotes servers, and BTTV emote servers require none of this hassle."
          },
        ],
        timestamp: new Date(),
        footer: {
        text: `Tag name: globalsnotworking`
        }
      }
    }); 
  }
    
 else if (tagname === 'noglobalshere') {
   message.channel.send({embed: {
        color: 16562432,
        description: "\n",
        fields: [{
            name: "Why aren't the global emotes on here working?",
            value: "This server does not have global emotes; we list servers that have them. If you want to donate, so we can get global emotes, send <@193979517470113792> a direct message."
          },
        ],
        footer: {
        text: `Tag name: noglobalshere`
        }
      }
    });
 }
    
 else if (tagname === 'pings' || tagname === 'mentions') {
   message.channel.send({embed: {
        color: 16562432,
        description: "\n",
        fields: [{
            name: "How do I stop a server from mentioning me?",
            value: "If the owner of the server is doing (@)everyone or (@)here, you can right-click the server icon and click Notification Settings then choose mute server and suppress (@)everyone and (@)here. If the owner is tagging a role, check if the role is self-assignable and remove the role using the command for the said bot."
        },
        ],
        footer: {
        text: `Tag name: pings`
        }
      }
    });
 }
    
  else if (tagname === 'expiredinvite') {
   message.channel.send({embed: {
        color: 16562432,
        description: "\n",
        fields: [{
            name: "Why is the global emote server's invite expired for me?",
            value: "One of the main reasons is that the invite is just expired, but another reason is that you're on 100 servers, and you need to leave a few, so the invites aren't expired. There's a chance that you were banned from the server because someone listed you on the user-made discord ban database used by bots like ServerHound."
        },
        ],
        footer: {
        text: `Tag name: expiredinvite`
        }
      }
    });
 }
    
 else if (tagname === 'mixeremotes') {
   message.channel.send({embed: {
        color: 16562432,
        description: "\n",
        fields: [{
            name: "What are Mixer global emotes?",
            value: "Mixer, just like GameWisp and BTTV are discord integrations that give servers the ability to have global emotes. Unfortunately, the Mixer integration is terrible and leads to small-sized emotes becoming enlarged on Discord causing them to look like pixelated trash."
        },
        ],
        footer: {
        text: `Tag name: mixeremotes`
        }
      }
    });
 } else {message.reply(`${tagname} is not a valid tag! Run '${prefix}tag all' to get all the tags.`)} 
  message.delete();
  }
});


// Log in the bot
client.login(process.env.token)
