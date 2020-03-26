import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Cadastro from './pages/Cadastro'
import Perfil from './pages/Perfil'
import Inicio from './pages/Inicio'
import Campanha from  './pages/Campanha'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/cadastro" exact component={Cadastro} />
                <Route path="/" exact component={Logon} />

                <Route path="/perfil" component={Perfil} />
                <Route path="/campanhas" exact component={Inicio} />
                <Route path="/campanhas/adicionar" component={Campanha} />
            </Switch>
        </BrowserRouter>
    );
}