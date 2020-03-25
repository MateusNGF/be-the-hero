const connection = require('../database/connection')
const table_name_incidents = 'incidents'
const table_name_ongs = 'ongs'
module.exports = {
    async listar(req, res) {
        const { pages = 1 } = req.query;

        const [count] = await connection(table_name_incidents).count()

        res.header('X-Total-Count', count['count(*)'])

        return res.json(await connection(table_name_incidents)
            .join(table_name_ongs, 'ongs.id', '=', 'incidents.ong_id')
            .limit(5).offset((pages - 1) * 5)
            .select(['incidents.*',
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

        if (!findOng) return res.json({ error : "Authorization invalid"})

        const [id] = await connection(table_name_incidents).insert({
            title, description, value, ong_id
        })
        return res.json({ "Status": true, "PostID": id })
    },

    async deletar(req, res) {
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const incident = await connection(table_name_incidents)
            .where('id', id).select('ong_id').first();
        if (incident != undefined) {
            if (incident.ong_id != ong_id) {
                return res.status(401).send({ error: "Operation rejected" })
            } else {
                await connection(table_name_incidents).where('id', id).delete()
                return res.status(204).send()
            }
        } else {
            return res.status(404).send({ error: "Incident not found" })
        }

    }
}