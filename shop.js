const Discord = require('discord.js');
const fs = require('fs');
const point = require('./point.json');
const bot = new Discord.Client();
const cfg = require('./index.json');
const prefix = cfg.prefix;
bot.on('ready', function () {
    console.log("shop")
});
function couleur()  {
    return  "#" + Math.floor(Math.random()*16777215).toString(16);
}
bot.on('message', function(message) {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if(command === "shop"){
        if(!message.guild) return;
        if (!point[message.author.id]) return message.reply("Aucun compte enregisté faire *bank");
        let curP = point[message.author.id].point;
        let grole = message.guild.roles.find(val => val.name ===  args.join(""));
        if (!args.length) {
            let embed = new Discord.RichEmbed()
                .setTitle("Voici la liste des rôles achetables :")
                .addField("tranquille ", '100', true)
                .addField("challenger", '200',  true)
                .addField("demi-dieu", '300', true)
                .setColor(couleur())
                .setTimestamp()
                .setFooter(message.author.username);
                message.channel.send(embed);
        }else if(!grole){
            message.reply("Rôle introuvable :warning:");
        }else if(args[0] === "tranquille"){
            if(curP < 100) return message.reply("Tu n'as pas assez d'argent");
            point[message.author.id].point = curP - 100;
           message.reply("Rôle acheté avec succès");
           message.member.addRole(grole);
        }else if(args[0] === "challenger"){
            if(curP < 200) return message.reply("Tu n'as pas assez d'argent");
            point[message.author.id].point = curP - 200;
            message.reply("Rôle acheté avec succès");
            message.member.addRole(grole);
        }else if (args[0] === "demi-dieu"){
            if(curP < 300) return message.reply("Tu n'as pas assez d'argent");
            point[message.author.id].point = curP - 300;
            message.reply("Rôle acheté avec succès");
            message.member.addRole(grole);
        }else{
            message.reply("Mettre un nom de rôle achetable");
        }
        fs.writeFile("./point.json", JSON.stringify(point), (err) => {
            if (err) console.log(err)
        });
    }
    if(command === "dpoint"){
        if(!message.guild) return;
        if (!point[message.author.id]) return message.reply("Aucun compte enregisté faire *bank");
        let curP = point[message.author.id].point;
        message.reply("Ton nombre de point : "+ curP);
    }
});
bot.login(cfg.token);