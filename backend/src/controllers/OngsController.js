
const crypto = require('crypto')
const bcrypt = require('bcryptjs')

const connection = require('../database/connection')

const table_name_ongs = 'ongs'
const table_name_campanhas = 'campanhas'

module.exports = {

    async listar(req, res) {
        var arrayOngs = await connection(table_name_ongs).select('*')
        for (let i = 0; i < arrayOngs.length; i++) {
            arrayOngs[i].password = undefined
        }
        return res.json(arrayOngs)
    },
    async criar(req, res) {
        var { name, email, password, whatsapp, city, uf } = req.body

        password = await bcrypt.hash(password, 10);
        const id = crypto.randomBytes(4).toString('HEX')
        
        await connection(table_name_ongs).insert({
            id, name, email, password, whatsapp, city, uf
        })

        console.log("ONG "+ name +" criada com sucesso")

        return res.json({ "status": true, "id": id })
    }
}