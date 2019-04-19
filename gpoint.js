const Discord = require('discord.js');
const fs = require('fs');
const point = require('./point.json');
const bot = new Discord.Client();
const cfg = require('./index.json');
const prefix = cfg.prefix;
bot.on('ready', function () {
    console.log("gpoint")
});

bot.on('message', function(message) {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if(command === "gpoint"){
        if(!message.guild) return;
        if (!message.member.hasPermission('MANAGE_ROLES')) return;
    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!user) return message.reply("Mentionner une personne à qui donner les points.");
    let raison = args.join("").slice(22);
        if(!raison) return message.reply("Mettre le nombre de coin");
        if(isNaN(raison)) return message.react("❌");
    message.channel.send(`${message.author.tag} à ajouté ${raison} points pour ${user}`);
    if (!point[user.id]) {
            point[user.id] = {
               point: 0
            };
        }
        let curpts = point[message.author.id].point;
        point[user.id].point = curpts + parseInt(raison);
        fs.writeFile("./point.json", JSON.stringify(point), (err) => {
            if (err) console.log(err)
            });
    }
    if(message.content === prefix + "bank"){
        if(!message.guild) return;
        if (!point[message.author.id]) {
            point[message.author.id] = {
               point: 0
            };
            message.reply(`ID du compte : ` + message.author.id);
            fs.writeFile("./point.json", JSON.stringify(point), (err) => {
                if (err) console.log(err)
                });
        }else{
            message.react("❌");
        }
        
    }
    if(command === "epoint"){
        if(!message.guild) return;
        if (!message.member.hasPermission('MANAGE_ROLES')) return;
    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!user) return message.reply("Mentionner une personne à qui enlever les points.");
    let raison = args.join("").slice(22);
        if(!raison) return message.reply("Mettre le nombre de point");
        if(isNaN(raison)) return message.react("❌");
    if (!point[user.id]) {
            point[user.id] = {
               point: 0
            };
        }
        let curpts = point[message.author.id].point;
        if(curpts === 0) return message.reply("Cette personne à 0 point");
        if(curpts < raison ) return message.reply(`Cette personne à seulement ${curpts} points`);
        point[user.id].point = curpts - parseInt(raison);
        message.channel.send(`${message.author.tag} à enlever ${raison} points à ${user} il lui reste ${curpts}`);
        fs.writeFile("./point.json", JSON.stringify(point), (err) => {
            if (err) console.log(err)
            });
    }
});

bot.login(cfg.token);