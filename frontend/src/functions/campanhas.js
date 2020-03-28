import api from '../services/api'

const deletar = async (id, ong_id) => {
    try {
        var confirmed = window.confirm('Deseja deletar essa publicação ?');
        if (confirmed) {
           const rsp =  await api.delete(`campanhas/${id}`, {
                headers: {
                    Authorization: ong_id
                }
            })

            if (rsp.data.status){
                alert("Sua campanha foi deletada")
                return true
            }else{
                alert(rsp.data.error)
                return false
            }
        }
    } catch (erro) {
        alert("Erro inesperado")
        console.log(erro)
        return false
    }
}

const adicionar = async (e, data ={}, authorization) => {

    try {
        e.preventDefault();
        var confirmed = window.confirm('Tudo certo para inserir ?');
        if (confirmed) {
            const response = await api.post(`campanhas`, data, {
                headers: {
                    Authorization: authorization
                }
            })

            if (response.data.status){
                alert(`Sua camapanha ${data.title} foi criada, ID ${response.data.post_id}`)
                return true
            }else{
                alert(response.data.error)
                return false
            }
        }
    } catch (erro) {
        alert("Erro inesperado")
        console.log(erro)
        return false
    }
}


export default { deletar, adicionar }

