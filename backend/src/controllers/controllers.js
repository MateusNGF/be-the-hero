const path = require('path')

module.exports = {
    Incidents: require(path.resolve('src/controllers/IncidentsController')),
    Ongs: require(path.resolve('src/controllers/OngsController')),
    Profile: require(path.resolve('src/controllers/ProfileController'))
}