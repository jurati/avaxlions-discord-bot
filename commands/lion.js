const request = require('request');
const config = require('../config')
const {createLionMessageEmbed} = require("../components/LionMessageEmbed");

exports.run = (client, message, args, level) => {
    if (!args[0]) {
        message.channel.send("Please specify the lion number. Example: ~lion 1")

        return
    }

    request(`${config.apiUrl}/list-meta?indices=${args[0]}`, function (error, response, body) {
        try {
            var lion = JSON.parse(body)[0]

            message.reply({embeds: [createLionMessageEmbed(lion)]});
        } catch (e) {
            message.channel.send(`could not find lion ${args[0]}`)
        }
    })
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "lion",
    category: "Miscellaneous",
    description: "show lion info",
    usage: "lion 1"
};
