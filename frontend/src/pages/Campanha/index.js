import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css'
import fcsCampanha from '../../functions/campanhas'

import logo from '../../assets/logo.svg'

export default function Campanha() {

    const history = useHistory()

    const ong_id = localStorage.getItem('ong_id')

    const [campTitulo, setTitulo] = useState('')
    const [campDescri, setDescri] = useState('')
    const [campValue, setEmail] = useState('')


    return (
        <div className="campanha-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Be the Hero" />

                    <h1>CRIAR CAMPANHA</h1>
                    <p>Divulgue a situação, busque doares que se solidarizão com sua campanha</p>
                    <Link className="link-back" to="/campanhas">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar pagina
                </Link>
                </section>
                <form onSubmit={ 
                    (e) => fcsCampanha.adicionar(ong_id, { 
                            title : campTitulo, 
                            description : campDescri,
                            value : campValue 
                         }, e).then(rsp => {
                             console.log(rsp)
                             if (rsp) { history.push('/perfil') }
                         })
                 }>
                    <input
                        placeholder="Titulo"
                        value={campTitulo}
                        onChange={e => setTitulo(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Descreva oque sua campanha faz ou busca."
                        value={campDescri}
                        onChange={e => setDescri(e.target.value)}
                    />
                    <input
                        placeholder="Valor a ser arrecadado"
                        value={campValue}
                        onChange={e => setEmail(e.target.value)}
                        type="number"
                        required
                    />
                    <div className="btns-group">
                        <button className="btn-1">cancelar</button>
                        <button type="submit" className="button">registrar campanha</button>
                    </div>
                </form>
            </div>
        </div>
    );
}