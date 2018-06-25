import React, { Component } from 'react';
import telf from './telf.jpg';
import resultado from './resultado.png'

class Explicacion extends Component {
  render() {
    return (
         
                <div className="container6 animated fadeIn fast" style={{color:'black'}}>
                
                            <h1 className="explitit display-2 mb-2">¿En qué consiste este <span style={{color:'rgb(96, 166, 206)'}}>Formulario</span>?</h1>
                            <h5> 
                                <p className="pExpli"> Con este cuestionario podrás conseguir información acerca del proyecto que se 
                                    adecue a tus necesidades, según tu sabiduría, preferencia de horario, movilidad y teletrabajo.
                                </p>
                                <p className="pExpli">
                                    Cuando se hayan contestado todas las preguntas aparecerá un resultado con los tres proyectos más acordes según tus preferencias,
                                    ordenados según la coincidencia de tus respuestas con los proyectos ya existentes. Aparecerá:
                                    </p>
                                    <p className="pExpli">


                                    <div className="clearfix">
                                        <img id="imgResultado" src={resultado}/>
                                        <div id="pExpli2">
                                        <p>-En color <span id="verde">verde</span> si el porcentaje coincidente es del 90-100%.</p>
                                        <p>-En color <span id="naranja">naranja</span> si el porcentaje coincidente es del 80-90%.</p>
                                        <p>-En color <span id="amarillo">amarillo</span> si el porcentaje coincidente es del 70-80%.</p>
                                        </div>
                                    </div>


                                    <p>- Podrás consultar todas tus preguntas contestadas en la pestaña de 'Historial de respuestas'. </p>

                                    
                                    </p>
                                  

                                <p id="resp"className="pExpli">
                                 <a title="telefono" href="https://www.bbvanexttechnologies.com/">
                                <img className="img2" src={telf}  alt="telefono"/></a>
                                    Para mas información contactar con un responsable.
                                    
                                </p>
                            </h5> 
                       
                </div>
    );
  }
}
export default Explicacion;