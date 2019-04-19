const Discord = require('discord.js');
const bot = new Discord.Client();
const {token, prefix} = require('../config');
bot.on('ready', function () {
    console.log("crole")
  });

function couleur()  {
                return  "#" + Math.floor(Math.random()*16777215).toString(16);
            }
bot.on('message', function(message) {
const args = message.content.slice(prefix.length).split(/ +/);
const command = args.shift().toLowerCase();

if(command === 'crole'){
  if(!message.guild) return;
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Tu n'as pas la permission de créer un rôle");
  if(!args.length) return message.reply("Définir le nom du rôle");
  message.guild.createRole({
    name: `${args}`,
    color: couleur(),
    })
    let embed = new Discord.RichEmbed()
      .setAuthor('Nouveau rôle')
      .setDescription(`Le rôle **${args}** vient d'être créé.`)
      .setFooter("Par : " + message.author.tag, message.author.avatarURL)
      .setTimestamp();
      message.guild.channels.find(val => val.name === 'modologs').send(embed);
}
});


bot.login(token);