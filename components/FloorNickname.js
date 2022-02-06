const config = require("../config");
const request = require("request");

function setFloorNickname(member) {
    request(`${config.apiUrl}/minted?page=0&sort=lowest_price`, function (error, response, body) {
        let lion = JSON.parse(body).data[0];

        member.setNickname(`Floor: ${lion.price} AVAX`)
    });
}

module.exports = { setFloorNickname };