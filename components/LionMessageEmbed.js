const {MessageEmbed} = require("discord.js");
const config = require("../config");

function createLionMessageEmbed(lion) {
    const result = new MessageEmbed()
        .setColor('#4F7EE6')
        .setTitle(lion.name)
        .setImage(lion.image)
        .setURL(`${config.url}/lion/${lion.id}`)
        .addFields(
            {name: 'Rarity', value: `${lion.score}`, inline: true},
            {name: 'Last', value: `${lion.lastSale ? `${lion.lastSale} AVAX` : 'Never sold'}`, inline: true},
            {name: 'Current', value: `${lion.price ? `${lion.price} AVAX` : 'Not Selling'}`, inline: true},
            { name: '\u200B', value: '\u200B' },
        )

    for (const attribute of lion.attributes) {
        result.addField(attribute.trait_type, attribute.value, true)
    }

    return result
}

module.exports = { createLionMessageEmbed };