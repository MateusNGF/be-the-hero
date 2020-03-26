const path = require('path')

module.exports = {
    Campanhas: require(path.resolve('src/controllers/CampanhasController.js')),
    Ongs: require(path.resolve('src/controllers/OngsController')),
    Profile: require(path.resolve('src/controllers/ProfileController'))
}