const request = require('request');
const config = require('../config');
const {createLionMessageEmbed} = require("../components/LionMessageEmbed");
const {setFloorNickname} = require("../components/FloorNickname");

let interval;
let lastSaleAt = new Date();

exports.run = (client, message, args, level) => {

    if(process.env.CHANNEL !== message.channel.id){
        return;
    }

    if (interval) {
        message.channel.send('Sells already on.');

        return;
    }

    interval = setInterval(() => {
        request(`${config.apiUrl}/minted?page=0&sort=recently_sold`, function (error, response, body) {
            let lions = JSON.parse(body).data.filter(lion => new Date(lion.saleAt) > lastSaleAt);

            for (const lion of lions.reverse()) {
                let reply = createLionMessageEmbed(lion).setTitle(`SOLD ${lion.name} for ${lion.lastSale} AVAX`)

                message.channel.send({embeds: [reply]})
            }

            if (lions.length > 0) {
                lastSaleAt = new Date(lions[0].saleAt)
                setFloorNickname(message.guild.members.cache.get(client.user.id))
            }
        });
    }, 30 * 1000)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "sells",
    category: "System",
    description: "Shows recent sells in a loop",
    usage: "sells"
};
