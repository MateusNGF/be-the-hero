const jwt = require('jsonwebtoken')
const jwtConfig = require('./secret')

module.exports = (params) => {
    return jwt.sign(params, jwtConfig.secret_key, {
        expiresIn: 86400
    })
}