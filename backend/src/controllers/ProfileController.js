const connection = require('../database/connection')
const bcrypt = require('bcryptjs')

const table_name_campanhas = 'campanhas'
const table_name_ongs = 'ongs'

module.exports = {
    async listar(req, res) {
        const ong_id = req.headers.authorization;

        const items = await connection(table_name_campanhas)
            .where('ong_id', ong_id).select('*')

        return res.json(items)
    },

    async login(req, res) {
        const { password, ong_id } = req.body;
        console.log(password, ong_id)

        if (ong_id != '') {
            if (password != ''){
                const profile = await connection(table_name_ongs).where('id', ong_id).first()

                if (!profile) {
                    return res.json({
                        status : false,
                        error: "Nenhuma ONG encontrada"
                    })
                } else {
                    if (await bcrypt.compare(password, profile.password)) {
                        return res.json({ 
                            status  : true, 
                            ong_name: profile.name 
                        })
                    } else {
                        return res.json({
                            status : false,
                            error: "Senha invalida"
                        })
                    }
                }
            }else {
                return res.json({
                    status : false,
                    error: "Precisa passars a senha"
                })
            }
        } else {
            return res.json({
                status : false,
                error: "Precisa passar seu ID"
            })
        }
    }
}