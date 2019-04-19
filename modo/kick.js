const {token, prefix} = require('../config');
const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();
bot.on('ready', function () {
    console.log("kick")
});
function couleur()  {
    return  "#" + Math.floor(Math.random()*16777215).toString(16);
}
bot.on('message', function(message) {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if(command === "kick"){
    if(!message.guild) return;
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply('tu n\'est pas administrateur . ');
    let membre = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!membre) return message.reply("Mentionner une personne à expulser.");
        if(membre.hasPermission('BAN_MEMBERS')) return message.react("❌");
    let raison = args.join(" ").slice(22);
        if(!raison) return message.reply("Mettre une raison.");
    membre.kick({
        reason: `expulser pour ${raison}`
    });
    let embed = new Discord.RichEmbed()
        .setTimestamp("Nouvelle expulsion :")
        .setAuthor(`Expulser par : ${message.author.tag}`)
        .addField('Raison de l\'explusion :', raison)
        .addField("Personne expulser : ", membre.displayName)
        .setColor(couleur())
        .setTimestamp();
    message.guild.channels.find(val => val.name === 'modologs').send(embed);
    } 
});
bot.login(token);