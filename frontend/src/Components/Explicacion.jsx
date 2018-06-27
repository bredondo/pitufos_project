import React, { Component } from 'react';
import telf from './telf.jpg';
import resultado from './resultado.png'

class Explicacion extends Component {
  render() {
    return (
         
                <div className="container6 animated fadeIn fast" style={{color:'black'}}>
                
                            <h1 className="explitit display-2 mb-2">¿En qué consiste este <span style={{color:'rgb(96, 166, 206)'}}>Formulario</span>?</h1>
                            <div className="pExpli">
                                    <img id="imgResultado" src={resultado}/>
                                    <div id="pExpli2">
                                            <p> Con este cuestionario podrás conseguir información acerca del proyecto que se 
                                                adecue a tus necesidades, según tu sabiduría, preferencia de horario, movilidad y teletrabajo.
                                            </p>
                                            <p>
                                                Cuando se hayan contestado todas las preguntas aparecerá un resultado con los tres proyectos más acordes según tus preferencias,
                                                ordenados según la coincidencia de tus respuestas con los proyectos ya existentes (Véase Imagen). Aparecerá:
                                            </p>
                                            <p>-En color <span id="verde">verde</span> si el porcentaje coincidente es del 90-100%.</p>
                                            <p>-En color <span id="naranja">naranja</span> si el porcentaje coincidente es del 80-90%.</p>
                                            <p>-En color <span id="amarillo">amarillo</span> si el porcentaje coincidente es del 70-80%.</p>
                                    </div>
                            </div>
                    <p id="resp"className="pExpli">
                    <a title="telefono" href="https://www.bbvanexttechnologies.com/">
                    <img className="img2" src={telf}  alt="telefono"/></a>
                        Para mas información contactar con un responsable.
                        
                    </p>
                
                       
                </div>
    );
  }
}
export default Explicacion;