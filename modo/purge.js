const Discord = require('discord.js');
const bot = new Discord.Client();
const cfg = require('../index.json');
const prefix = cfg.prefix;
bot.on('ready', function () {
    console.log("purge")
  });
bot.on('message', function(msg) {
    if(msg.content.startsWith(prefix + "purge")){
    const args = msg.content.slice(prefix.length).split(/ +/)
    if (!msg.member.permissions.has('MANAGE_MESSAGES')) return msg.reply('tu n\'es pas admin . ');
    if (!args.length) return msg.channel.send(`Mettre un nombre de message à enlever.`);
    if (isNaN(args[1])) return msg.channel.send(':warning: `Entrer un nombre valide`');
    if (args[1] > 100) return msg.channel.send(':warning: `Entrer un nombre plus petit que 100`');
    msg.channel.bulkDelete(args[1]);
    var Embed = new Discord.RichEmbed()
    .setAuthor('Message supprimé')
    .setDescription(`Supprimé **${args[1]}** messages :white_check_mark:`)
    .setFooter('Par ' + msg.author.tag, msg.author.avatarURL)
    .setColor('#009900');
    msg.channel.send(Embed);
    }
});

bot.login(cfg.token);