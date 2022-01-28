const request = require('request');
const config = require('../config');
const {createLionMessageEmbed} = require("../components/LionMessageEmbed");

let interval;
let lastListedAt = new Date();

exports.run = (client, message, args, level) => {
    if(process.env.CHANNEL !== message.channel.id){
        return;
    }

    clearInterval(interval);

    interval = setInterval(() => {
        request(`${config.apiUrl}/minted?page=0&sort=recently_listed`, function (error, response, body) {
            let lions = JSON.parse(body).data.filter(lion => new Date(lion.listedAt) > lastListedAt);

            for (const lion of lions.reverse()) {
                let reply = createLionMessageEmbed(lion).setTitle(`LISTED ${lion.name} for ${lion.price} AVAX`)

                message.channel.send({embeds: [reply]})
            }

            if (lions.length > 0) {
                lastListedAt = new Date(lions[0].listedAt)
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
    name: "listings",
    category: "System",
    description: "Shows recent listings in a loop",
    usage: "listings"
};
