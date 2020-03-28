import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import './styles.css';
import fcsOngs from '../../functions/ongs';

import heroes from '../../assets/heroes.png'
import logo from '../../assets/logo.svg'

export default function Logon() {
    const history = useHistory()

    const [ong_id, setOngId] = useState('')
    const [password, setPassword] = useState('')

    if (localStorage.getItem('ong_id')){
        history.push('/perfil')
    }


    return (
        <div className="logon-container">
            <section className="form">
                <img src={logo} alt="Be the Hero" />
                <form onSubmit={(e) => {
                    fcsOngs.logon(e, { ong_id, password}).then(
                        (rsp) => {
                            if (rsp){
                                history.push('/perfil')
                            }
                        })
                }}>
                    <h1>Fazer meu Logon</h1>
                    <input
                        placeholder="ID da ONG"
                        value={ong_id}
                        onChange={e => setOngId(e.target.value)}
                        required
                    />
                    <input
                        placeholder="Senha de acesso"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="button">entrar</button>
                    <Link className="link-back" to="/cadastro">
                        <FiLogIn size={16} color="#E02041" />
                        Registrar minha ONG
                    </Link>
                </form>
            </section>

            <img src={heroes} alt="Heroes" />
        </div >
    );
}