const {token, prefix} = require('../config');
const Discord = require('discord.js');
const fs = require('fs');
const warn = require('./warn.json');
const bot = new Discord.Client();
bot.on('ready', function () {
    console.log("unwarn")
});
function couleur()  {
    return  "#" + Math.floor(Math.random()*16777215).toString(16);
}
bot.on('message', function(message) {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if(command === "unwarn"){
        if(!message.guild) return;
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply('tu n\'est pas administrateur . ');
    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!user) return message.reply("Mentionner une personne à unwarn.");
    let raison = args.join(" ").slice(22);
        if(!raison) return message.reply("Mettre une raison.");
        if(user.id === "308162523108999169") return message.reply("Suce boule ...");
        
    if (!warn[user.id]) {
            warn[user.id] = {
                warn: 0
            };
        }
    let curwarn = warn[user.id].warn;
    if(curwarn === 0) return message.reply("Ce membre n'as pas de warn");
    warn[user.id].warn = curwarn - 1;
    let embed = new Discord.RichEmbed()
        .setTimestamp("Nouveau unwarn :")
        .setAuthor(`Unwarn par : ${message.author.tag}`)
        .addField('Raison du unwarn:', raison)
        .addField("Personne unwarn : ", user.displayName)
        .setColor(couleur())
        .setTimestamp();
    message.guild.channels.find(val => val.name === 'modologs').send(embed);
    
    fs.writeFile("./warn.json", JSON.stringify(warn), (err) => {
            if (err) console.log(err)
        });
    }
});
bot.login(token);