import React, { Component } from "react";
import MainRecomendacion from './MainRecomendacion';
import Contactos from './Contactos';
import Formacion from './Formacion';

import logo from './logo3.png'
import { Route, NavLink, HashRouter } from "react-router-dom";
import axios from 'axios';
import Explicacion from './Explicacion';

class RecomendacionOpciones extends Component {

   
    
    render() {
        return (
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">

                            <div class="tabbable-panel">
                                <div class="tabbable-line">
                                    <div>
                                        <ul className="nav nav-tabs">
                                            <li>
                                                <NavLink className="nav-link active" exact to="/recomendacion/explicacion">Explicación</NavLink>
                                            </li>
                                            <li>
                                                <NavLink className="nav-link active"  to="/recomendacion/formulario">Formulario</NavLink>
                                            </li>
                                            <li>
                                                <NavLink className="nav-link disabled"  to="/#">Historial de respuestas</NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="tab-content">
                                        <Route exact path="/recomendacion/explicacion" component={Explicacion}/>
                                        <Route exact path="/recomendacion/formulario" component={MainRecomendacion}/>

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

