import api from '../services/api'

const deletar = async (id, ong_id) => {
    try {
        var confirmed = window.confirm('Deseja deletar essa publicação ?');
        if (confirmed) {
            await api.delete(`campanhas/${id}`, {
                headers: {
                    Authorization: ong_id
                }
            }).then(rsp => {
                alert(`Sua publicação foi deletada`)
                return true
            })
        }
    } catch (erro) {
        alert("Não foi possivel deletar")
        return false
    }
}

const adicionar = async (autho, data = {}, e) => {

    try {
        e.preventDefault();
        var confirmed = window.confirm('Tudo certo para inserir ?');
        if (confirmed) {
            await api.post(`campanhas`, data, {
                headers: {
                    Authorization: autho
                }
            })
            alert(`Sua camapanha foi criada`)
            return true
        }
    } catch (erro) {
        alert("Não foi possivel adicionar sua campanha")
        return false
    }
}


export default { deletar, adicionar }

