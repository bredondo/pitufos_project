import React, { Component } from "react";
import MainRecomendacion from './MainRecomendacion';
import Contactos from './Contactos';
import Formacion from './Formacion';

import logo from './logo3.png'
import { Route, NavLink, HashRouter, Redirect } from "react-router-dom";
import axios from 'axios';
import Explicacion from './Explicacion';

import Historial from './HistorialRespuestas';

class RecomendacionOpciones extends Component {

   
    render() {
        return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">

                            <div className="tabbable-panel">
                                <div className="tabbable-line">
                                    <div>
                                        <ul className="nav nav-tabs" id="nav2">
                                            <li>
                                                <NavLink className="nav-link" exact to="/recomendacion/">Instrucciones</NavLink>
                                            </li>
                                            <li>
                                                <NavLink className="nav-link" to="/recomendacion/formulario">Formulario</NavLink>
                                            </li>
                                            <li>
                                                <NavLink className="nav-link" to="">Historial de respuestas</NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="tab-content">

                                        <Route exact path="/recomendacion/" component={Explicacion}/>
                                        <Route  path="/recomendacion/formulario" component={MainRecomendacion}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default RecomendacionOpciones;

