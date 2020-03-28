import api from '../services/api'


const logout = () => {
    const confirmed = window.confirm("Deseja mesmo desconectar ? ")
    if (confirmed) {
        localStorage.clear()
        return true
    } else {
        return false
    }
}

const logon = async (e, data = {}) => {
    try {
        e.preventDefault()
        const rsp = await api.post('perfil/login', data)

        if (rsp.data.status) {
            alert("Acesso authorizado")
            
            localStorage.setItem('ong_name', rsp.data.ong_name)
            localStorage.setItem('ong_id', data.ong_id)

            return true
        } else {
            alert(rsp.data.error)
            return false
        }

    } catch (erro) {
        console.log(erro)
        alert("Erro inesperado")
        return false
    }
}

const cadastro = async (e, data = {}) => {

    try {
        e.preventDefault()

        if (data.password === data.password2) {

            const newOng = {
                name: data.name,
                email: data.email,
                password: data.password,
                whatsapp: data.whatsapp,
                city: data.city,
                uf: data.uf
            }


            const rsp = await api.post('ongs', newOng)

            if (rsp.data.status) {
                alert(`ATENÇÃO : Guarde seu ID, para fazer acesso junto a sua senha. ID > ${rsp.data.id}`)
                return true
            } else {
                throw new Error('Algo deu errado com Servidor')
            }

        } else {
            throw new Error('Senhas não batem')
        }
    } catch (erro) {
        alert(erro)
        return false
    }

}

export default { logout, logon, cadastro }