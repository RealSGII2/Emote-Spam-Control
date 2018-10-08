// Getting variables
const Discord = require('discord.js');
const client = new Discord.Client();
var EOMIDs = new Array();

var reg = /(?:[>]+|:[A-Za-z0-9]+:)\w+/;

let promptopen = false;
let promptid = 0;
let pstage = 0;
let p1 = "";
let p2 = "";

// Settings
const limit = 3; // Limit for emote only messages
let allbypass = false;
let dwa = 4000; // Milliseconds to wait before deleting the warning
const allowedroles = ['357371636539981824', '357371681985134592', '474073433202884618', '357610506946609153', '459102161310318632']; // IDs of the roles that are allowed to bypass
let prefix = "+";

// Actual coding for the bot
client.on("ready", () => {
    client.user.setGame("around with testers");
    console.log("GEH Helper has started!")
});

client.on("message", async message => {
  const cont = message.content;
  if (reg.test(cont)) {
      if (EOMIDs[message.author.id] === 2) {
      if (message.member.roles.has(357371636539981824) || message.member.roles.has(357371681985134592) || message.member.roles.has(474073433202884618) || message.member.roles.has(357610506946609153) || message.member.roles.has(459102161310318632) || allbypass === true) {
          const warning = await message.reply("you're sending " + cont + " a bit too quickly! Messages weren't deleted because you can bypass.");
          setTimeout(function() {warning.delete()}, dwa);
      } else {
          const warning = await message.reply("you're sending emote only messages too quickly!")
          setTimeout(function() {warning.delete()}, dwa);
      }} 
	  const count = EOMIDs[message.author.id] || 0
	  EOMIDs[message.author.id] = count + 1;
	  setTimeout(function() {EOMIDs[message.author.id] = count - 1;}, 12000)
  }
    
    
    
    
  // Now for the commands
    
    
  if (cont === prefix + 'sub') {
      if (promptopen === false && promptid !== message.author.id) {
          promptopen = true;
          promptid = message.author.id;
      } else {
	  message.channel.send("You're already in an active prompt!")
      }
  }
    
  if (promptopen === true && promptid === message.author.id) {
      pstage = pstage + 1;
      if (cont === 'cancel' || cont === 'Cancel') {message.channel.send("Cancelled prompt."); promptopen = false; pstage = 0; promptid = 0;}
      if (promptopen === false) return;
      if (pstage === 1) {
	      message.channel.send({embed: {
    				color: 3066993,
    				description: "\n",
    				fields: [{
    				    name: "Submit Suggestion/ Bug",
   				    value: "🗣 Report bugs and send suggestions with this command! Abuse of this command may lead you to getting blocked from this command. \n\nSay anything to continue. \nSay **cancel** to cancel."
 		 		    },
  				],
				}
			});
      } else if (pstage === 2) {
          message.channel.send({embed: {
    				color: 3066993,
    				description: "\n",
    				fields: [{
    				    name: "Submit Suggestion/ Bug",
   				    value: "❔ What should the **title** of your submission be? \n\nState your answer to continue. \nSay **cancel** to cancel."
 		 		    },
  				],
				}
			});
      } else if (pstage === 3) {
          p1 = cont;
          message.channel.send({embed: {
    				color: 3066993,
    				description: "\n",
    				fields: [{
    				    name: "Submit Suggestion/ Bug",
   				    value: "❔ What should the **description** be? \n\nState your answer to continue. \nSay **cancel** to cancel."
 		 		    },
  				],
				}
			});
      } else if (pstage === 4) {
	      p2 = cont
	      message.channel.send({embed: {
    				color: 3066993,
    				description: "\n",
    				fields: [{
    				    name: "Submit Suggestion/ Bug",
   				    value: "Your submission has been sent. \n\nPreview:"
 		 		    },
					 {
						 name: p1,
						 value: p2
						 }
  				],
				}
			});
	      client.guilds.get('489624363877007360').channels.get('498640427646189597').send({embed: {
    				color: 3066993,
    				description: "\n",
    				fields: [{
    				    name: "Submit Suggestion/ Bug",
   				    value: "Sent by " + message.author.tag
 		 		    },
					 {
						 name: p1,
						 value: p2
						 }
  				],
				}
			});
          promptopen = false;
          promptid = 0;
          pstage = 0;
	  p1 = "";
	  p2 = "";
      }
  }
    
  if(promptid === message.author.id) return;
  if(message.author.bot) return;
  if(message.content.indexOf(prefix) !== 0) return;
  if(!message.channel.id === '357406786736881677' || !message.channel.id) return;
  const allowedids = ['200661467152777216', '193979517470113792', '258706134850863106'];
    
  
  
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase()
  
  if (command === 'allowbypass' || command === 'setwarningdel' || command === 'setname') {
  
  if (allowedids.includes(message.author.id)) {
  
  if (command === 'allowbypass') {
      const setting = args.shift();
      if (setting === 'true' || setting === 'false') {allbypass = setting; message.reply(`the option to all bypass for everyone set to **${allbypass.toString()}**!`)} else {message.reply("the settings must either be: `['true', 'false']`!")}
  }
	  
  if (command === 'setname') {
      const name = args.join(" ");
      client.user.setUsername(name).then(() => {message.reply(`new name set to ${name}!`)}).catch(err => {message.reply(`err! ${err}`)});
  }
					    
  if (command === 'setwarningdel') {
      const time = args.shift();
      if (!isNaN(time)) {
          dwa = time;
          message.reply(`the warning message for emote spam will now be deleted after **${time}** seconds!`);
      } else {
          message.reply(`the option can only be set to numbers!`)
      }
  }
      
  } else {message.reply("you can't use that command!")}}
  
  if (command === 'ping') {
   const m = await message.channel.send("Pinging...");
    m.edit(`Pong! ${Math.round(client.ping)}ms`); 
  }
  
  if (command === 'help') {
	  message.channel.send({embed: {
    				color: 3066993,
    				description: "\n",
    				fields: [{
    				    name: "Help",
   				    value: "`+sub` Submit a bug or suggestion. \n`+help` Shows this menu. \n`+ping` Shows the bot's ping. \n`+stats` Views stats. \n`+tag <name | all>` Uses Global Emote Hunter's tag system and sends them. \n`+mentionable <role>` Changes a role's mentionable state. \n`+mpadd <user>` Adds a user to the list who can use the mentionable command."
 		 		    },
  				],
				}
			});
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
  .setAuthor("OmniTM Stats", client.user.avatarURL)
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
  
  const menallowedid =  ['278252072732852225', '263795393563721728', '130433131307204608', '289532145960091649', '193979517470113792', '258706134850863106'];
  if (command === 'mentionable') {
	  if (menallowedid.includes(message.author.id)) {
	  let role = args.join(" ");
	  if (!role) return message.reply("please say a role to make mentionable or unmentionable.");
	  if (message.guild.roles.find("name", role)) {
		  if (message.guild.roles.find("name", role).mentionable) {message.guild.roles.find("name", role).setMentionable(false, `Requested by ${message.author.tag}.`); message.reply(`${role} is no longer mentionable.`);}
		  if (!message.guild.roles.find("name", role).mentionable) {message.guild.roles.find("name", role).setMentionable(true, `Requested by ${message.author.tag}.`); message.reply(`${role} is now mentionable!`);}
		  } else {
	message.reply("can't find that role! Make sure you say the full name.");
	 }
	  } else {message.reply("you are not allowed to run that command!");}
  }
  
  if (command === 'mpadd') {
	  if (menallowedid.includes(message.author.id)) {
		  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
		  if (!wUser) return message.reply("that is not a valid user!");
		  menallowedid.push(wUser.id);
		  message.reply(`${wUser.tag} has been added.`);
		  client.guilds.get('489624363877007360').channels.get('498627673413779476').send(`Add ${wUser.tag} (${wUser.id}) to menallowedid!`)
	}
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
		 {
			 name: "Note",
			 value: "These tags are meant for GEH only."
		}
		
		
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
      
 else if (tagname === 'everyone') {message.channel.send("<@&379719520622870529>")}
    
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
 } else {let msg = await message.reply(`${tagname} is not a valid tag! Run '${prefix}tag all' to get all the tags.`); setTimeout(function() {msg.delete()}, 5000)} 
 message.delete();
  }
});


// Log in the bot
client.login(process.env.token)
