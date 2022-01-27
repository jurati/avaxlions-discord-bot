const request = require('request');
const config = require('../config');
const {createLionMessageEmbed} = require("../components/LionMessageEmbed");

exports.run = (client, message, args, level) => {
    request(`${config.apiUrl}/minted?page=0&sort=lowest_price`, function (error, response, body) {
        let lion = JSON.parse(body).data[0];

        let reply = createLionMessageEmbed(lion).setTitle(`Floor ${lion.price} AVAX for ${lion.name}`)

        message.channel.send({embeds: [reply]})
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "floor",
    category: "Miscellaneous",
    description: "show cheapest lion info",
    usage: "floor"
};
