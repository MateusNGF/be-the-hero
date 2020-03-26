const connection = require('../database/connection')

const table_name_campanhas = 'campanhas'
const table_name_ongs = 'ongs'

module.exports = {
    async listar(req, res) {
        const { pages = 1 } = req.query;

        const [count] = await connection(table_name_campanhas).count()

        res.header('X-Total-Count', count['count(*)'])

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

        if (!findOng) return res.json({ error: "Authorization invalid" })

        const [id] = await connection(table_name_campanhas).insert({
            title, description, value, ong_id
        })

        console.log("Campanha "+title+" criada por " +findOng.name+" com sucesso.")
        return res.json({ "status": true, "post_id": id })
    },

    async deletar(req, res) {
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const incident = await connection(table_name_campanhas)
            .where('id', id).select('ong_id').first();
        if (incident != undefined) {
            if (incident.ong_id != ong_id) {
                return res.status(401).send({ error: "Operation rejected" })
            } else {
                const rsp = await connection(table_name_campanhas).where('id', id).delete()
                console.log("Campanha "+ rsp.name +" deletado por "+ ong_id+" com sucesso")
                return res.status(204).send()
            }
        } else {
            return res.status(404).send({ error: "Incident not found" })
        }

    }
}