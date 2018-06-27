import React, { Component } from 'react';
import telf from './telf.jpg';
import resultado from './resultado.png'

class Explicacion extends Component {
  render() {
    return (
         
                <div className="container6 animated fadeIn fast" style={{color:'black'}}>
                
                            <h1 className="explitit display-2 mb-2">¿En qué consiste este <span style={{color:'rgb(96, 166, 206)'}}>Formulario</span>?</h1>
                
                            <div> 
                                <p className="pExpli"> Con este cuestionario podrás conseguir información acerca del proyecto que se 
                                    adecue a tus necesidades, según tu sabiduría, preferencia de horario, movilidad y teletrabajo.
                                </p>
                                <p className="pExpli">
                                    Cuando se hayan contestado todas las preguntas aparecerá un resultado con los tres proyectos más acordes según tus preferencias,
                                    ordenados según la coincidencia de tus respuestas con los proyectos ya existentes.
                                    <br></br> Las posibles opciones son las siguientes:
                                </p>
                                    <div className="pExpli center-block">
                                        <div className="clearfix" id="explicacionResultado">
                                            <img id="imgResultado" src={resultado} />
                                            <img id="imgResultado" src={resultado} />
                                            <img id="imgResultado" src={resultado} />
                                        </div>
                                    </div>
                                  

                                <p id="resp"className="pExpli">
                                 <a title="telefono" href="https://www.bbvanexttechnologies.com/">
                                <img className="img2" src={telf}  alt="telefono"/></a>
                                    Para mas información contactar con un responsable.
                                    
                                </p>
                            </div> 
                       
                </div>
    );
  }
}
export default Explicacion;