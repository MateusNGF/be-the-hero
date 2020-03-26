import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiHome, FiPlusSquare, FiTrash2 } from 'react-icons/fi'

import './styles.css';
import api from '../../services/api'
import fcsOng from '../../functions/ongs'
import fcsCamp from '../../functions/campanhas'

import logo from '../../assets/logo.svg'


export default function Perfil() {
    const ong_name = localStorage.getItem('ong_name')
    const ong_id = localStorage.getItem('ong_id')

    const history = useHistory()

    if (!ong_id || !ong_name) {
        history.push('/');
    }

    const [ong_campanhas, setOngCampanha] = useState([])
    
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ong_id
            }
        }).then(response => {
            setOngCampanha(response.data)
        })
    }, [ong_id])

    return (
        <div className="perfil-container">
            <header>
                <img src={logo} alt="Be the Hero" />
                <span>BEM VINDO, {ong_name}</span>

                <Link className="button btn-2" to="/campanhas/adicionar">
                    <FiPlusSquare size={18} style={{ margin: 5 }} color="white" />NOVA CAMPANHA
                </Link>
                <Link to="/campanhas" className="link-button">
                    <FiHome size={20} color="#e02041" />
                </Link>
                <Link className="link-button" onClick={fcsOng.logout}>
                    <FiPower size={20} color="#e02041" />
                </Link>
            </header>

            <section className="listagem">

                <div className="cabecalho">
                    <h1> suas campanhas publicadas : </h1>
                    <h3><strong color="#fefefe">{ong_campanhas.length}</strong> campanhas</h3>
                </div>
                <div className="listagem-vazia" style={(ong_campanhas.length !== 0) ? { display : 'none'} : null }>
                    <h1>VOCÊ AINDA NÃO FEZ NENHUMA CAMPANHA</h1>
                </div>

                <ul className="listagem-casos">
                    {ong_campanhas.map(campanhas => (
                        <li key={campanhas.id} className="cards-casos">
                            <strong>TITULO</strong>
                            <p>{campanhas.title}</p>

                            <strong>DESCRIÇÃO</strong>
                            <p>{campanhas.description}</p>

                            <strong>ARECADAÇÃO</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(campanhas.value)}</p>
                            <button type="button" onClick={
                                () => fcsCamp.deletar(campanhas.id, ong_id).then(
                                    () => setOngCampanha(ong_campanhas.filter(campanha => campanhas.id !== campanha.id)))
                            }>
                                <FiTrash2 size={20} color="#e02041" />
                            </button>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}