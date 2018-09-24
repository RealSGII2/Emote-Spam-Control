// Getting variables
const Discord = require('discord.js');
const client = new Discord.Client();
var EOMIDs = new Array();
EOMIDs[258706134850863106] = 1;


// Settings
const limit = 3; // Limit for emote only messages
let allbypass = false;
let dwa = 4000; // Milliseconds to wait before deleting the warning
const allowedroles = ['357371636539981824', '357371681985134592', '474073433202884618', '357610506946609153', '459102161310318632']; // IDs of the roles that are allowed to bypass
let prefix = "$";

// Actual coding for the bot
client.on("ready", () => {
    client.user.setGame("around with testers");
    console.log("GEH Helper has started!")
});

client.on("reaction", async message => {
    message.forEach(r => console.log(r.count.toString()))
})

client.on("message", async message => {
  const cont = message.content;
  if (cont === 'a') {
      if (EOMIDs[message.author.id]) {
          const count = EOMIDs[message.author.id]
          const newcount = EOMIDs[message.author.id] + +1;
          EOMIDs[message.author.id] = newcount;
      } else {
          EOMIDs[message.author.id] = 1;
      }
      if (EOMIDs[message.author.id] === 3) {
      if (message.member.roles.has(357371636539981824) || message.member.roles.has(357371681985134592) || message.member.roles.has(474073433202884618) || message.member.roles.has(357610506946609153) || message.member.roles.has(459102161310318632) || allbypass === true) {
          const warning = await message.reply("you're sending " + cont + " a bit too quickly! Messages weren't deleted because you can bypass.");
          setTimeout(function() {warning.delete()}, dwa);
      } else {
          message.channel.fetchMessages().then(messages => {
          const botMessages = messages.filter(msg => msg.author.id === message.author.id);
          message.channel.bulkDelete(3,botMessages);
          EOMIDs[message.author.id] = 0;
          messagesDeleted = botMessages.array().length;
          console.log('Deletion of messages successful. Total messages deleted: ' + messagesDeleted);
      }).catch(err => {
          console.log('Error while doing Bulk Delete');
          console.log(err);
    });
          setTimeout(function() {
          client.channels.get("360179378333941761").send(`${message.author.tag} has emote spammed. I delete their messages.`);
          client.channels.get("493129145560203265").send(`${message.author.tag} has emote spammed in GEH (<#${message.channel.id}>.)  I delete their messages.`);
          const warning = message.reply("you're sending emote only messages too quickly!");
          setTimeout(function() {warning.delete()}, dwa);}, 1000);
      } 
      }
  }
    
    
    
    
  // Now for the commands
    
    
    
  if(message.author.bot) return;
  if(message.content.indexOf(prefix) !== 0) return;
  if(!message.channel.id === '357406786736881677') return;
  const allowedids = ['200661467152777216', '193979517470113792', '258706134850863106'];
    
  
  
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase()
  
  if (command === 'allowbypass' || command === 'setwarningdel') {
  if (allowedids.includes(message.author.id)) {
  
  if (command === 'allowbypass') {
      const setting = args.shift();
      if (setting === 'true' || setting === 'false') {allbypass = setting; message.reply(`the option to all bypass for everyone set to **${allbypass.toString()}**!`)} else {message.reply("the settings must either be: `['true', 'false']`!")}
  }
      
  if (command === 'log') {
      const msg = args.join(" ");
      client.channels.get("360179378333941761").send(msg);
      client.channels.get("493129145560203265").send(msg);
  }
  
  if (command === 'setwarningdel') {
      const time = args.shift();
      if (!isNaN(time)) {
          dwa = time;
          message.reply(`the warning message for emote spam will now be deleted after **${time}** milliseconds!`);
      } else {
          message.reply(`the option can only be set to numbers!`)
      }
  }
      
  if (command === 'setprefix') {
      const pref = args.shift();
      if (pref.length < 6 && pref.length > 0) {
          prefix = pref;
          message.channel.send("New prefix set to **" + pref + "**!");
          client.channels.get("360179378333941761").send("The current prefix for this version was updated to **" + pref + "**.");
          client.channels.get("493129145560203265").send("The current prefix for this version was updated to **" + pref + "**.");
      } else {
          message.reply("your new prefix must be between `1` and `5` digits!")
      }
  }
  
  } else {message.reply("you can't use that command!")}}
  
  if (command === 'ping') {
   const m = await message.channel.send("Pinging...");
    m.edit(`Pong! ${Math.round(client.ping)}ms`); 
  }
  
  if (command === 'printcount') {
      message.channel.send("You have sent " + EOMIDs[258706134850863106].toString() + " emote only messages.")
  }
      
  if (command === 'stats' || command === 'status') {
   let avatar = client.users.get('258706134850863106').avatarURL;
   
   let totalSeconds = (client.uptime / 1000);
   let hours = Math.floor(totalSeconds / 3600);
   totalSeconds %= 3600;
   let minutes = Math.floor(totalSeconds / 60);
   let seconds = Math.round(totalSeconds % 60);
   
   let uptime = `${hours}h ${minutes}m ${seconds}s`;
   
   const embed = new Discord.RichEmbed()
  .setAuthor("GEH Helper Stats", client.user.avatarURL)
  .setColor(3447003)
  .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL)
  .setThumbnail(avatar)
  .setTimestamp()
  .addField("Uptime", uptime, true)
  .addField("Owner", "Omnidroid v10 • SGII2#2990", true)
  .addBlankField(false)
  .addField("Users", client.users.size, true)
  .addField("Servers", client.guilds.size, true)

  message.channel.send({embed});
 
  }
  
  if (command === 'help') {
      message.channel.send({embed: {
        color: 3447003,
        description: "\n",
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        fields: [{
            name: "All Commands",
            value: "`$invite` - Get invite info \n`$ping` - Pings the bot. \n`$stats` - Views stats about the bot. \n`$tag` - Tag command. Say `$tag all` to view all the tags or `$tag <tag_name>` to send the tag."
          },
        ],
        timestamp: new Date(),
        footer: {
        icon_url: message.author.avatarURL,
        text: `Requested by ${message.author.tag}`
        }
      }
    });
      
    if (allowedids.includes(message.author.id)) {
        message.author.send({embed: {
        color: 3447003,
        description: "\n",
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        fields: [{
            name: "Admin Commands",
            value: "`$setwarningdel <int>` - Set the time to delete a warning message after (in milliseconds.) \n`$allowbypass <true | false>` - Allows everyone to bypass emote only message control."
          },
        ],
        footer: {
        icon_url: message.author.avatarURL,
        text: `Requested by ${message.author.tag}`
        }
      }
    });
    }
  }
    
  if (command === 'invite') {
      message.channel.send({embed: {
        color: 3447003,
        description: "\n",
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        fields: [{
            name: "How do I get the Thanks! role?",
            value: "You get the role 'Thanks!' by inviting at least **five** people. You may view your invites with `!invites`."
        },
        {
            name: "Bot Invite",
            value: "You may not invite me. I am a private bot for Global Emote Hunters only programmed by <@258706134850863106>."
        },
        {
            name: "Server Invite",
            value: "Here is a server invite: https://discord.gg/Aem7tnE. **YOU WILL NOT GET CREDITED INVITATIONS FROM THIS INVITE!**"
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
        timestamp: new Date(),
        footer: {
        icon_url: message.author.avatarURL,
        text: `Requested by ${message.author.tag}`
        }
      }
    });
    }
    
  else if (tagname === 'esc') {
      message.channel.send({embed: {
        color: 3447003,
        description: "\n",
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        fields: [{
            name: "What is Emote Spam Control?",
            value: "Emote spam control is a bot auto moderation feature that deletes messages if a specific user posts **three emote only messages**."
          },
          {
            name: "How do I clear my counter?",
            value: "If you send **ten non-emote only messages**, your counter will be reset."
          },
        ],
        footer: {
        icon_url: message.author.avatarURL,
        text: `Tag name: esc`
        }
      }
    });
    }
      
    else if (tagname === 'kiri') {message.channel.send("Sub2<@289532145960091649>")}
      
  else if (tagname === 'globalsnotworking') {
   message.channel.send({embed: {
        color: 16562432,
        description: "\n",
        fields: [{
            name: "Why aren't the Global Emotes working even though I joined the server?",
            value: "Emotes failing to work depends on the integration: GameWisp requires you to have a role on the server--some global emote servers will automatically give you this role. If the role isn't automatically given, you'll have to add it yourself manually. If you've met the above requirement, you may need to restart your discord. Mixer emotes servers, and BTTV emote servers require none of this hassle."
          },
        ],
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
