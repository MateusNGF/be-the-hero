import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css'
import fcsCampanha from '../../functions/campanhas'

import logo from '../../assets/logo.svg'

export default function Campanha() {

    const history = useHistory()

    const ong_id = localStorage.getItem('ong_id')

    const [title, setTitulo] = useState('')
    const [description, setDescri] = useState('')
    const [value, setValue] = useState('')


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
                    (e) => {
                        fcsCampanha.adicionar(e, { title, description, value }, ong_id)
                        .then( (rsp) => {
                            if (rsp) {
                                history.push('/perfil')
                            }
                        })
                    }
                 }>
                    <input
                        placeholder="Titulo"
                        value={title}
                        onChange={e => setTitulo(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Descreva oque sua campanha faz ou busca."
                        value={description}
                        onChange={e => setDescri(e.target.value)}
                    />
                    <input
                        placeholder="Valor a ser arrecadado"
                        value={value}
                        onChange={e => setValue(e.target.value)}
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