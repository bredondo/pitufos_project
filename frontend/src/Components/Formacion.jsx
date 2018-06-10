import React, { Component } from 'react';
class Formacion extends Component {
  render() {
    return (
        <div>
            <div className="jumbotron" id="fondoDiv">
                <div className="container">
                    <div className="col-md-12">
                        <div className="text-center text-white">
                            <h1 className="display-2 mb-2">¿Qué es Blue Graduates?</h1>
                            <h5> 
                            <p>Cras facilisis urna ornare ex volutpat, et
                            convallis erat elementum. Ut aliquam, ipsum vitae
                            gravida suscipit, metus dui bibendum est, eget rhoncus nibh
                            metus nec massa. Maecenas hendrerit laoreet augue
                            nec molestie.</p>
                            <p>
                            uCum sociis natoque penatibus et magnis
                            dis parturient montes, nascetur ridiculus mus.
                            Cras facilisis urna ornare ex volutpat, et
                            convallis erat elementum. Ut aliquam, ipsum vitae
                            gravida suscipit, metus dui bibendum est, eget rhoncus nibh
                            metus nec massa. Maecenas hendrerit laoreet augue
                            nec molestie.</p></h5> 
                        </div>
                    </div>
                </div>
            </div>

            <section id="about">
                <div className="container">
                    <div className="text-intro">
                        <h2>HORARIO</h2>
                        <div className="divHorario">
                            <div className="row">
                                <div className="col-sm">
                                    <p>
                                    <a className="btn btn-outline-dark btn-lg btn-block" href="http://localhost:8000/horario.pdf"> Ver</a>
                                    </p>
                                </div>
                                <div className="col-sm">
                                    <p>
                                    <a className="btn btn-outline-dark btn-lg btn-block" href="http://localhost:8000/horario.xlsx" download> Descargar</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <h2>TEMARIO</h2>
                        <div className="divTemario">
                            <div className="row">
                                <div className="col-sm">
                                    <p>
                                    <a className="btn btn-outline-dark btn-lg btn-block" href="http://localhost:8000/temario.pdf"> Ver</a>
                                    </p>
                                </div>
                                <div className="col-sm">
                                    <p>
                                    <a className="btn btn-outline-dark btn-lg btn-block" href="http://localhost:8000/temario.pptx" download> Descargar</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
  }
}
export default Formacion;