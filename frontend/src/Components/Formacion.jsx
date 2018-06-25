import React, { Component } from 'react';
import { myConfig } from '../config.js';

class Formacion extends Component {
 
  render() {
    return (
        <div className="animated fadeIn fast">
            <div className="jumbotron" id="fondoDiv">
                <div className="container" style={{color:'white'}}>
                    <div className="col-md-12">
                        <div className="textForm text-center ">
                            <h1 className="display-2 mb-2">¿Qué es <span style={{color:'rgb(96, 166, 206)'}}>Blue</span> Graduates?</h1>
                            <h5>
                            <p>Con este programa podrás crecer como profesional, aprender todo lo que
                                quieras y más, y rodearte de gente que haga de tu día a día.</p></h5>
                        </div>
                    </div>
                </div>
            </div>

<<<<<<< HEAD
            <div style={{margin:'50px'}} className="d-flex justify-content-center">
=======
            <div className="d-flex justify-content-center">
>>>>>>> dev
                <div className="row">

                    <div className="col-md-6">
                        <div className="card" style={{height:'auto'}}>
                              <div className="card-body">
                                <h6 className="card-text text-center">Consulta tu</h6>
                                <h2 className="card-title text-center font-weight-bold">HORARIO</h2>
                                <hr/>
                                <a href={myConfig.url + "/horario.pdf"} className="btn btn-outline-dark btn-sm btn-block" target="_blank"><i className="fas fa-file-pdf"></i> Ver</a>
                                <a href={myConfig.url + "/horario.xlsx"} className="btn btn-outline-dark btn-sm btn-block" download><i className="fas fa-file-excel"></i> Descargar</a>
                              </div>
                        </div>
                    </div>
<<<<<<< HEAD
                    <div className="card" id="divTemario" style={{border:' 2px solid #AEB6BF'}}>
                        <h2 style={{margin:'40px'}}>TEMARIO</h2>
                                <p>
                                <a className="btn btn-outline-dark btn-lg btn-block" href={myConfig.url + "/temario.pdf"} target="_blank" style={{width:'200px', margin:'auto'}}> Ver</a>
                                </p>
                                <p>
                                <a className="btn btn-outline-dark btn-lg btn-block" href={myConfig.url + "/temario.pptx"} download style={{width:'200px', margin:'auto'}}> Descargar</a>
                                </p>

=======

                    <div className="col-md-6">
                        <div className="card" style={{height:'auto'}}>
                              <div className="card-body">
                                <h6 className="card-text text-center">Entérate de tu</h6>

                                <h2 className="card-title text-center font-weight-bold">TEMARIO</h2>
                                <hr></hr>
                                <ul>Ponte al día con las tecnologías del momento
                                    <li><i className="fas fa-circle"></i>Vue, React, Polymer</li>
                                    <li><i className="fas fa-circle"></i>Flask, Pymongo, Spring, NodeJS</li>
                                </ul>
                                    <a href={myConfig.url + "/temario.pdf"} className="btn btn-outline-dark btn-sm btn-block" target="_blank"><i className="fas fa-file-pdf"></i> Ver</a>
                                    <a href={myConfig.url + "/temario.pptx"} className="btn btn-outline-dark btn-sm btn-block" download><i className="fas fa-file-powerpoint"></i> Descargar</a>
                              </div>
                        </div>
>>>>>>> dev
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
export default Formacion;
