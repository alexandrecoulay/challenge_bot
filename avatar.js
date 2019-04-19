const {token, prefix} = require('./config');
const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();
bot.on('ready', function () {
    console.log("avatar")
});
bot.on('message', function(message) {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if(command === "avatar"){
    if(!message.guild) return;
    let membre = message.mentions.users.first() ;
        if(!membre){
            message.channel.send(message.author.displayAvatarURL);
        }else{
            message.channel.send(membre.displayAvatarURL);
        }
    }
});
bot.login(token);