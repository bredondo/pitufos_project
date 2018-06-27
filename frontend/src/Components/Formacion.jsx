import React, { Component } from 'react';
import { myConfig } from '../config.js';

class Formacion extends Component {
 
  render() {
    return (
        <div className="animated fadeIn fast formacion">
            <div className="jumbotron" id="fondoDiv">
                <div className="container" style={{color:'white'}}>
                    <div className="col-md-12">
                        <div className="textForm text-center ">
                            <h1 className="display-2 mb-2">¿Qué es <span style={{color:'rgb(96, 166, 206)'}}>Blue</span> Graduates?</h1>
                            <h5>
                           </h5>
                        </div>
                    </div>
                </div>
            </div>
            <p id="textheader">Con este programa podrás crecer como profesional y aprender nuevas tecnologías.
              <br></br>Además tendrás el mejor ambiente y podrás rodearte de gente maravillosa.
              <br></br>¡Lo único que te hace falta es esfuerzo, perseverancia, compañerismo y muchas muchísimas ganas de aprender!

            </p>

            
            <div className="d-flex justify-content-center">
                <div className="row"  >

                    <div className="col-md-6">
                        <div className="card" >
                              <div className="card-body">
                                <h6 className="card-text text-center">Consulta tu</h6>
                                <h2 className="card-title text-center font-weight-bold">HORARIO</h2>
                                <hr></hr>
                                <p id="textHorario">Consulta tu horario establecido.
                                    <br></br> No llegues nunca tarde.
                                    <br></br> Disfruta de la jornada intensiva.
                                    <br></br> Sal a las 15 los viernes!
                                </p>
                                <a href={myConfig.url + "/horario.pdf"} className="btn btn-outline-dark btn-sm btn-block center-block " target="_blank"><i className="fas fa-file-pdf"></i> Ver</a>
                                <a href={myConfig.url + "/horario.xlsx"} className="btn btn-outline-dark btn-sm btn-block center-block" download><i className="fas fa-file-excel"></i> Descargar</a>
                              </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card">
                              <div className="card-body">
                                <h6 className="card-text text-center">Entérate de tu</h6>
                                <h2 className="card-title text-center font-weight-bold">TEMARIO</h2>
                                <hr></hr>
                                <ul >Ponte al día con las tecnologías del momento
                                    <li><i className="fas fa-circle"></i>Vue, React, Polymer</li>
                                    <li><i className="fas fa-circle"></i>Flask, Pymongo, Spring, NodeJS</li>
                                </ul>
                                    <a href={myConfig.url + "/temario.pdf"} className="btn btn-outline-dark btn-sm btn-block" target="_blank"><i className="fas fa-file-pdf"></i> Ver</a>
                                    <a href={myConfig.url + "/temario.pptx"} className="btn btn-outline-dark btn-sm btn-block" download><i className="fas fa-file-powerpoint"></i> Descargar</a>
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