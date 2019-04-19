const Discord = require('discord.js');
const fs = require('fs');
const point = require('./clé.json');
const bot = new Discord.Client();
const cfg = require('./index.json');
const prefix = cfg.prefix;
bot.on('ready', function () {
    console.log("clé")
});
function couleur()  {
    return  "#" + Math.floor(Math.random()*16777215).toString(16);
}
function nombre(){
    return Math.floor(Math.random()*6)

}
let cle = ["tF54-0EIP-57HD", "BH7d-8edE-H8tj", "8kG5-u7J8-fF8e", "JiJ8-87Uf-1F6g", "852f-Fe8g-poi3", "groK-fei8-oihf", "4fe5-fe85-Hfea"];
bot.on('message', function(message) {
    if(message.content === prefix + "clé"){
        if(message.author.id != 308162523108999169) return message.reply("Tu n'es pas le créateur du serveur");
        let rep = cle[0];
        //si la clé n'exsite pas 
        if (!point[rep]) {
            point[rep] = {
               utilise: 1
            };
            fs.writeFile("./clé.json", JSON.stringify(point), (err) => {
                if (err) console.log(err)
            });
            return message.channel.send("Clé ajouté : " + rep);
        }
        //si la clé existe déjà
        let cur = point[rep].utilise;
            while(cur === 1){
                var nbr  = 1;
                rep = cle[nbr];
                nbr++;
                if (!point[rep]) {
                    point[rep] = {
                       utilise: 1
                    };
                    fs.writeFile("./clé.json", JSON.stringify(point), (err) => {
                        if (err) console.log(err)
                    });
                    return message.channel.send("Clé ajouté : " + rep);
                }
                console.log("boucle : " + rep);
                let cur = point[rep].utilise;
            }

        /*message.reply("Clé prête à l'utilisation : "+ rep);
        point[rep].utilise = 1;
    fs.writeFile("./clé.json", JSON.stringify(point), (err) => {
        if (err) console.log(err)
        });*/
    }
});
bot.login(cfg.token);