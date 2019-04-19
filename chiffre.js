const Discord = require('discord.js');
const bot = new Discord.Client();
const cfg = require('./index.json');
const prefix = cfg.prefix;
bot.on('ready', function () {
  console.log("chiffre")
  bot.user.setActivity('blbl').catch(console.error)
});
function random(){
    return Math.floor(Math.random() * 25); 
}
bot.on('message', function(message) {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if(command === "chiffre"){
        /*let mot = args.join(" ");
        alphabet = ['','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
        let lalea = alphabet[random()];
        message.channel.send(random() + lalea);*/
    }
   
});

bot.login(cfg.token);