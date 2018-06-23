import React, { Component } from 'react';
import { myConfig } from '../config.js';

class Formacion extends Component {
 
  render() {
    return (
        <div>
            <div className="jumbotron" id="fondoDiv" >
                <div className="container" style={{color:'white'}}>
                    <div className="col-md-12">
                        <div className="text-center ">
                            <h1 className="display-2 mb-2">¿Qué es <span style={{color:'rgb(96, 166, 206)'}}>Blue</span> Graduates?</h1>
                            <h5>
                            <p>Con este programa podrás crecer como profesional, aprender todo lo que
                                quieras y más, y rodearte de gente que haga de tu día a día.</p></h5>
                        </div>
                    </div>
                </div>
            </div>


            <div style={{margin:'50px'}} className="d-flex justify-content-center">
                <div className="row">
                    <div className="card" id="divHorario" style={{border:' 2px solid #AEB6BF'}}>
                         <h2 style={{margin:'40px'}}>HORARIO</h2>
                                <p>
                                <a className="btn btn-outline-dark btn-lg btn-block" href={myConfig.url + "/horario.pdf"} target="_blank" style={{width:'200px', margin:'auto', border:'none'}}><i className="fas fa-file-pdf"></i> </a>
                                </p>
                                <p>
                                <a className="btn btn-outline-dark btn-lg btn-block" href={myConfig.url + "/horario.xlsx"} download style={{width:'200px', margin:'auto', border:'none'}}><i className="fas fa-file-excel"></i> </a>
                                </p>
                    </div>

                    <div className="card" id="divTemario" style={{border:' 2px solid #AEB6BF'}}>
                        <h2 style={{margin:'40px'}}>TEMARIO</h2>
                                <p>

                                <a className="btn btn-outline-dark btn-lg btn-block" href={myConfig.url + "/temario.pdf"} target="_blank" style={{width:'200px', margin:'auto', border:'none'}}><i className="fas fa-file-pdf"></i> </a>
                                </p>
                                <p>
                                <a className="btn btn-outline-light btn-lg btn-block" href={myConfig.url + "/temario.pptx"} download style={{width:'200px', margin:'auto'}}><i className="fas fa-file-powerpoint"></i> </a>
                                </p>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
export default Formacion;