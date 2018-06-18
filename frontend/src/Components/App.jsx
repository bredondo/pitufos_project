import React, { Component } from "react";
import MainRecomendacion from './MainRecomendacion';
import Contactos from './Contactos';
import Formacion from './Formacion';
import logo from './logo3.png'
import { Route, NavLink, HashRouter } from "react-router-dom";
import axios from 'axios';

class App extends Component {

    async componentDidMount(){
        axios.get('http://10.1.3.128:8000/user/usuario2@usuario.com')
            .then(function (response) {
                localStorage.setItem('user', JSON.stringify(response.data.result[0]));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    render() {
        return (
            <HashRouter>
                <div>
                    <header>
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <a href="/#/" className="navbar-brand" >
                                <img className="img" src={logo} />
                            </a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="nav navbar-nav navbar-right">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" exact to="/">Formación</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/recomendacion">Recomendacion de proyecto</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/contactos">Tus Compañeros</NavLink>
                                    </li> 
                                
                                </ul>
                            </div>
                        </nav>
                    </header>
                    <div>
                        <Route exact path="/" component={Formacion}/>
                        <Route path="/recomendacion" component={MainRecomendacion}/>
                        <Route path="/contactos" component={Contactos}/>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default App;
