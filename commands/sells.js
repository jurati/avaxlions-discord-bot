const request = require('request');
const config = require('../config');
const {createLionMessageEmbed} = require("../components/LionMessageEmbed");

let interval;
let lastSaleAt = new Date();

exports.run = (client, message, args, level) => {

    if(process.env.CHANNEL !== message.channel.id){
        return;
    }

    clearInterval(interval);

    interval = setInterval(() => {
        request(`${config.apiUrl}/minted?page=0&sort=recently_sold`, function (error, response, body) {
            let lions = JSON.parse(body).data.filter(lion => new Date(lion.saleAt) > lastSaleAt);

            for (const lion of lions.reverse()) {
                let reply = createLionMessageEmbed(lion).setTitle(`SOLD ${lion.name} for ${lion.lastSale} AVAX`)

                message.channel.send({embeds: [reply]})
            }

            if (lions.length > 0) {
                lastSaleAt = new Date(lions[0].saleAt)
            }
        });
    }, 30 * 1000)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Server Owner"
};

exports.help = {
    name: "sells",
    category: "System",
    description: "Shows recent sells in a loop",
    usage: "sells"
};
