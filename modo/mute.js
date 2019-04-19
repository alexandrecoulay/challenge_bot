const {token, prefix} = require('../config');
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.on('ready', function () {
    console.log("mute")
});
bot.on('message', async function(message) {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    let reason = args.slice(1).join(' ');
if(command === "mute"){
      if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send(":warning: Tu n'as pas la permission d'utiliser cette commande !");

      let membre = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
      if(!membre) return message.channel.send(":warning: Tu dois mentionner un utilisateur !");
      if(membre.hasPermission('BAN_MEMBERS')) return message.react("❌");
      //if(!membre.manageable) return message.channel.send(":warning: Je ne peux pas mute cette personne !");
      if (!reason) reason = 'raison non spécifiée';
      var mutedrole = message.guild.roles.find(val => val.name === 'mute');
      let membreRole = message.guild.roles.find(val => val.name === 'membre');
     
     if(!mutedrole) {
      message.reply("Création du rôle mute, si cela ne fonctionne, refaire la commande ");
      message.guild.createRole({
          name: "mute", 
          color:"bc0000",
          permissions: "READ_MESSAGES"
        });
     };
      // le bot ne mute pas la première fois quand le rôle mute n'existe pas
         membre.addRole(mutedrole);
         membre.removeRole(membreRole);   
     var mEmbed = new Discord.RichEmbed()
    .setTitle("Nouvelle personne mute :")
    .setColor("#bc0000")
    .addField("Utilisateur :", `${membre} `)
    .addField("Modérateur :", `<@${message.author.id}> `)
    .addField("Raison", reason)
    .setTimestamp();
    message.channel.send(mEmbed);
    }
});
bot.login(token);