import React, { Component } from "react";
/* Components */
import MainRecomendacion from './MainRecomendacion';
import Contactos from './Contactos';
import Formacion from './Formacion';
import RecomendacionOpciones from './RecomendacionOpciones';
import { PrivateRoute } from './PrivateRoute';
import Ajustes from './Ajustes';
import Login from "./Login";
import Proyectos from "./Proyectos";

import { Route, NavLink, HashRouter, Redirect, Switch } from "react-router-dom";
import { myConfig } from '../config.js';
import axios from 'axios';
import logo from './logo3.png'


class App extends Component {
    constructor(props) {
        super(props);
        this.updateIsAuth = this.updateIsAuth.bind(this);
        this.state = {
          isAuth: false
        };
      }
    updateIsAuth(value){
        this.setState({isAuth: value});
    }
    logout = () => {
        this.setState({isAuth: false});
        localStorage.clear();
    }
    render() {
        return (
            <HashRouter>
                <div>
                    <header>
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
                            <a href="/#/" className="navbar-brand" >
                                <img className="img" src={logo} />
                            </a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent"> 
                                {localStorage.getItem('user') || this.state.isAuth ?  
                                    <ul className="nav navbar-nav"> 
                                        <li className="naveoptions nav-item">
                                        <NavLink className="nav-link" exact to="/">Formación</NavLink>
                                        </li>
                                        <li className="naveoptions nav-item">
                                            <NavLink className="nav-link" to="/recomendacion">Recomendacion de proyecto</NavLink>
                                        </li>
                                        <li className="naveoptions nav-item">
                                            <NavLink className="nav-link" to="/contactos">Tus Compañeros</NavLink>
                                        </li>
                                        <li className="naveoptions nav-item">
                                            <NavLink className="nav-link" to="/proyectos">Proyectos</NavLink>
                                        </li>
                                        <li className="naveoptions nav-item">
                                            <NavLink className="nav-link" to="/login" onClick={this.logout}>Salir</NavLink>
                                        </li>
                                        <li className="naveoptions nav-item">
                                            <NavLink className="nav-link" to="/ajustes"><i className="fas fa-cog"></i></NavLink>
                                        </li>
                                    </ul>
                                    :
                                    <ul className="nav navbar-nav"> 
                                        <li className="nav-item">
                                        <NavLink className="nav-link" to="/login">Login</NavLink>
                                        </li> 
                                    </ul> 
                                }
                            </div>
                        </nav>
                    </header>
                    <div>
                        <Switch>
                            <PrivateRoute exact path="/" component={Formacion}/>
                            <PrivateRoute path="/recomendacion" component={RecomendacionOpciones}/>
                            <PrivateRoute path="/contactos" component={Contactos}/>
                            <PrivateRoute path="/ajustes" component={Ajustes}/>
                            <PrivateRoute path="/proyectos" component={Proyectos}/>
                            <Route path='/login' render={(props)=>(<Login {...props} updateIsAuth={this.updateIsAuth}/>)}/>
                            <Redirect to='/'/>
                        </Switch>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default App;