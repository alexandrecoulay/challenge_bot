const Discord = require('discord.js');
const bot = new Discord.Client();
const {token, prefix} = require('../config');
bot.on('ready', function () {
    console.log("grole")
});
function couleur()  {
    return  "#" + Math.floor(Math.random()*16777215).toString(16);
}
bot.on('message', function(message) {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if(command === 'grole'){
            if(!message.guild) return;
            if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Désolé, mais tu n'as pas les permissions pour effectué cette commande.");
            let membre = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
                if(!membre) return message.reply("mentionner une personne pour donner le rôle.");
            let role = args.join("").slice(22);
                if(!role) return message.reply("mettre le nom d'un rôle");
            let grole = message.guild.roles.find(val => val.name ===  role);
                if(!grole) return message.reply("Rôle introuvable :warning:");

            if(membre.roles.has(grole.id)) return message.reply("Ce membre à déjà le role", grole.name);
            membre.addRole(grole.id);

            let embed = new Discord.RichEmbed()
                .setTitle("Nouveau rôle donné :")
                .setColor(couleur())
                .addField("Rôle donné :", grole.name)
                .addField("Receveur du rôle : ", membre)
                .setFooter("Donné par :", message.author.displayAvatarURL)
                .setTimestamp();
            message.guild.channels.find(val => val.name === 'modologs').send(embed);
        }
});
bot.login(token);