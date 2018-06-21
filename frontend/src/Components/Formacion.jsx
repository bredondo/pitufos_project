import React, { Component } from 'react';
import { myConfig } from '../config.js';

class Formacion extends Component {
 
  render() {
    return (
        <div>
            <div className="jumbotron" id="fondoDiv">
                <div className="container" style={{color:'white'}}>
                    <div className="col-md-12">
                        <div className="textForm text-center ">
                            <h1 className="display-2 mb-2">¿Qué es <span style={{color:'rgb(96, 166, 206)'}}>Blue</span> Graduates?</h1>
                            <h5>
                            <p>Con este programa podrás crecer como profesional, aprender todo lo que
                                quieras y más, y rodearte de gente que haga de tu día a día erfjeksfsef
                                sfjkserfnjkersnfkaejnf
                                aekrjfnejkraejk.</p></h5>
                        </div>
                    </div>
                </div>
            </div>








            <div style={{backgroundColor:'lightgray'}} className="d-flex justify-content-center">
                <div className="row">
                    <div className="col-md-6">
                        <div class="card" style={{height:'auto'}}>
                              <div class="card-body">
                                <h6 class="card-text text-center">Consulta tu</h6>
                                <h2 class="card-title text-center">HORARIO</h2>
                                <hr/>
                                <a href="http://localhost:8000/horario.pdf" className="btn btn-outline-dark btn-sm btn-block"><i class="fas fa-file-pdf"></i> Ver</a>
                                <a href="http://localhost:8000/horario.xlsx" className="btn btn-outline-dark btn-sm btn-block"><i class="fas fa-file-excel"></i> Descargar</a>
                              </div>
                        </div>
                    </div>


                    <div className="col-md-6">
                        <div class="card" style={{height:'auto'}}>
                              <div class="card-body">
                                <h6 class="card-text text-center">Entérate de tu</h6>

                                <h2 class="card-title text-center">TEMARIO</h2>
                                <hr></hr>
                                <ul>    Ponte al día con las teconolgías del momento
                                        <li><i class="fas fa-check"></i>Vue, React, Polymer</li>
                                        <li><i class="fas fa-check"></i>Flask, Pymongo, Spring, NodeJS</li>
                                </ul>
                                     <a href="http://localhost:8000/temario.pdf" className="btn btn-outline-dark btn-sm btn-block"><i class="fas fa-file-pdf"></i> Ver</a>
                                     <a href="http://localhost:8000/temario.pptx" className="btn btn-outline-dark btn-sm btn-block"><i class="fas fa-file-powerpoint"></i> Descargar</a>
                              </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
export default Formacion;