import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import fcsOngs from '../../functions/ongs'

import logo from '../../assets/logo.svg';

export default function Cadastro() {

    const history = useHistory();

    if (localStorage.getItem('ong_id')){
        history.push('/perfil')
    }

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [whatsapp, setWatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState('');

    return (
        <div className="cadastro-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Be the Hero" />

                    <h1>CADASTRE SUA ONG.</h1>
                    <p>Permita-nos ajudar nas suas boas ações,
                    compartilhe seus casos e
                         receba ajuda voluntaria.</p>
                    <Link className="link-back" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Fazer Logon
                </Link>
                </section>
                <form onSubmit={
                    (e) => fcsOngs.cadastro(e, {
                        name, email,
                        password, password2,
                        whatsapp, city, uf
                    }).then(
                        (rsp) => {
                            if (rsp) { history.push('/') }
                        })}>
                    <input
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <input
                        placeholder="E-mail ativo"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        placeholder="Senha de acesso"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <input
                        placeholder="Confirme a senha"
                        type="password"
                        value={password2}
                        onChange={e => setPassword2(e.target.value)}
                        required
                    />
                    <input
                        placeholder="Numero pra contato ( whatsapp ) "
                        value={whatsapp}
                        onChange={e => setWatsapp(e.target.value)}
                        required
                    />

                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            required />
                        <input
                            placeholder="UF"
                            value={uf}
                            onChange={e => setUF(e.target.value)}
                            style={{ width: 80 }}
                            required />
                    </div>
                    <button
                        type="submit" className="button">cadastrar ONG</button>

                </form>
            </div>
        </div>
    );
}