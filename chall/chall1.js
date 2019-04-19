const {token, prefix} = require('../config');
const Discord = require('discord.js');
const fs = require('fs');
const point = require('../point.json');
const bot = new Discord.Client();
bot.on('ready', function () {
    console.log("1")
});

bot.on('message', function(message) {
    var args = message.content.split(/ /g).slice(1);
    var reponse = args.join(" ");
        if(message.content.startsWith(prefix +"chall1")){
            if(!reponse) return message.reply("mettre une réponse");
            if (reponse === 'message.reply("bonjour");' || reponse  === 'message.channel.send("bonjour");'  ){
                if (!point[message.author.id]) {
                    message.delete();
                    message.reply("Fais un *bank pour pouvoir faire les challenges");
                }else{
                    message.delete();
                    message.guild.channels.find(val => val.name === 'bureau').send(message.author.tag + "viens de réussi le challenge 1 lui ajouter 10pts");
                    message.channel.send("Chall1 réussi en attente de vérification");
                }
            }else{
                message.reply("mauvaise réponse");
        }
    }
});

bot.login(token);