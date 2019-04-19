const {token, prefix} = require('../config');
const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();
bot.on('ready', function () {
    console.log("unban")
});
function couleur()  {
    return  "#" + Math.floor(Math.random()*16777215).toString(16);
}
bot.on('message', function(message) {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if(command === "unban"){
    if(!message.guild) return;
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply('tu n\'est pas administrateur . ');
    let membre = args[0];
        if(!membre) return message.reply("Mettre l'ID d'une personne à bannir.");
        if(isNaN(membre)) return message.reply("ID invalide");
    let raison = args.join(" ").slice(22);
    message.guild.unban(membre).catch(function (e){
        message.reply("Personne non banni");
    });
    let embed = new Discord.RichEmbed()
        .setTimestamp("Nouveau unban :")
        .setAuthor(`unban par : ${message.author.tag}`)
        .addField('Raison du unban :', raison)
        .addField("Personne unban : ", membre)
        .setColor(couleur())
        .setTimestamp();
    message.guild.channels.find(val => val.name === 'modologs').send(embed);
    } 
});
bot.login(token);