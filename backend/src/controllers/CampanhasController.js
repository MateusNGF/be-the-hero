const connection = require('../database/connection')

const table_name_campanhas = 'campanhas'
const table_name_ongs = 'ongs'

module.exports = {
    async listar(req, res) {
        const { pages = 1 } = req.query;

        const [count] = await connection(table_name_campanhas).count()

        res.header('TotalCountItems', count['count(*)'])

        return res.json(await connection(table_name_campanhas)
            .join(table_name_ongs, 'ongs.id', '=', 'campanhas.ong_id')
            .limit(5).offset((pages - 1) * 6)
            .select(['campanhas.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'])
        );
    },

    async criar(req, res) {
        const { title, description, value } = req.body
        const ong_id = req.headers.authorization

        const findOng = await connection(table_name_ongs).where('id', ong_id).first()

        if (!findOng) {
            return res.json({
                status: false,
                error: "Authorização invalida"
            })
        }

        const [id] = await connection(table_name_campanhas).insert({
            title, description, value, ong_id
        })

        console.log("Campanha " + title + " criada por " + findOng.name + " com sucesso.")
        return res.json({ "status": true, "post_id": id })
    },

    async deletar(req, res) {
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const rsp_campanha = await connection(table_name_campanhas)
            .where('id', id).select('*').first();

        if (rsp_campanha != undefined) {
            if (rsp_campanha.ong_id != ong_id) {
                return res.json({
                    status: false,
                    error: "Permissão negada"
                })
            } else {

                await connection(table_name_campanhas)
                    .where('id', id)
                    .delete()
                    
                console.log(`ONG ${ong_id} deletou a campanha : ${rsp_campanha.title}. Data : ${new Date().toDateString()}`)
                return res.json({
                    status: true
                })
            }
        } else {
            return res.json({
                status: false,
                error: "Camapanha não encontrada"
            })
        }

    }
}