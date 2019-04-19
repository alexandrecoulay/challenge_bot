const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();
const cfg = require('./index.json');
const prefix = cfg.prefix;
bot.on('ready', function () {
  //bot.user.setAvatar('./img/jsut.png');
    console.log("prêt");
    setInterval(async () => {
        const statuslist = [
          `*help | ${bot.channels.size} salons`,
          `*help | ${bot.users.size} membres`
        ];
        const random = Math.floor(Math.random() * statuslist.length);
    
        try {
          await bot.user.setPresence({
            game: {
              name: `${statuslist[random]}`,
              type: "STREAMING",
              url: 'https://www.twitch.tv/alex_off'
            },
            status: "online"
          });
        } catch (error) {
          console.error(error);
        }
      }, 10000);
});
function couleur()  {
    return  "#" + Math.floor(Math.random()*16777215).toString(16);
}
require('./modo/rolemembre');
require('./modo/unban');
require('./modo/ban');
require('./modo/kick');
require('./modo/grole');
require('./modo/crole');
require('./modo/warn');
require('./modo/unwarn');
require('./modo/purge');
require('./modo/autorole');
require('./chall/chall1');
//require('./chall/chall2');
require('./gpoint');
require('./shop');
require('./avatar');
require('./modo/mute');
require('./modo/unmute');

bot.on('message', function(message) {
if(message.content === prefix + "co"){
    message.reply("yep");
}
});
bot.login(cfg.token);