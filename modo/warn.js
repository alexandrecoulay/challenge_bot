const {token, prefix} = require('../config');
const Discord = require('discord.js');
const fs = require('fs');
const warn = require('./warn.json');
const bot = new Discord.Client();
bot.on('ready', function () {
    console.log("warn")
});
function couleur()  {
    return  "#" + Math.floor(Math.random()*16777215).toString(16);
}
bot.on('message', function(message) {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if(command === "warn"){
        if(!message.guild) return;
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply('tu n\'est pas administrateur . ');
    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!user) return message.reply("Mentionner une personne à warn.");
        if(user.hasPermission('BAN_MEMBERS')) return message.react("❌");
    let raison = args.join(" ").slice(22);
        if(!raison) return message.reply("Mettre une raison.");
    if(user.id === "yourID") return message.reply("C'est le boss donc impossible à warn.");
    if (!warn[user.id]) {
            warn[user.id] = {
                warn: 0
            };
        }
    let embed = new Discord.RichEmbed()
        .setTimestamp("Nouveau warn :")
        .setAuthor(`Warn par : ${message.author.tag}`)
        .addField('Raison du warn:', raison)
        .addField("Personne warn : ", user.displayName)
        .setColor(couleur())
        .setTimestamp();
    message.guild.channels.find(val => val.name === 'modologs').send(embed);
    
    let curwarn = warn[user.id].warn;
    warn[user.id].warn = curwarn + 1;

    fs.writeFile("./warn.json", JSON.stringify(warn), (err) => {
            if (err) console.log(err)
        });
        if(curwarn === 3){
            message.channel.send(`${user.displayName} à ${curwarn} warn. Il faut peut être faire quelque chose`);
        }
        if(curwarn === 5){
            message.channel.send(`${user.displayName} à ${curwarn} warn. Un sanction est attendu`);
        }
    }
if(command === "dispwarn"){
    if(!message.guild) return;
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply('tu n\'est pas administrateur . ');
    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!user) return message.reply("Mentionner pour voir ses warn.");
        if (!warn[user.id]) {
            warn[user.id] = {
                warn: 0,
            };
        }
    message.channel.send(`${user.displayName} à ${warn[user.id].warn} warn`);
    }    
});
bot.login(token);
