import React, { Component } from 'react';
import telf from './telf.jpg';


class Explicacion extends Component {
  render() {
    return (
         
                <div className="container6" style={{color:'black'}}>
                
                            <h1 className="explitit display-2 mb-2">¿En qué consiste este <span style={{color:'rgb(96, 166, 206)'}}>Formulario</span>?</h1>
                            <h5> 
                                <p className="pExpli"> Con este cuestionario podrás conseguir un poco mas de información acerca del proyecto perfecto para tí, que se 
                                    adecue a tus necesidades, según tu sabiduría, preferencia de horario, movilidad y teletrabajo.
                                </p>
                                <p className="pExpli">   
                                    Para realizarlo tendrás que contestar una serie de preguntas, y en función de la respuesta a la primera de ellas, 
                                    deberás calificar del <span id="cero">0 al 10 </span> un conjunto de tecnologías relacionadas con tu respuesta en la pregunta número 1.
                                    Además, habrá unas preguntas básicas que aparecerán siempre, aunque en la primera pregunta respondas cosas diferentes, 
                                    como son las preguntas de movilidad, teletrabajo y horario.
                                </p>
                                <p className="pExpli">
                                    Una vez que todas las preguntas estén respondidas, tendrás que pulsar en el  <span id="cero">botón de enviar</span>, y seguidamente, 
                                    aperecerá un resultado con los tres proyectos más acordes según tus preferencias, ordenados según la coincidencia de tus respuestas
                                    con los proyectos ya existentes.
                                    </p>
                                    <p className="pExpli">

                                    De los tres proyectos resultantes, saldrá:
                                    </p>
                                    <p className="pExpli">-En color <span id="verde">verde</span> si el porcentaje coincidente es del 90-100%.</p>
                                    <p className="pExpli">-En color <span id="naranja">naranja</span> si el porcentaje coincidente es del 80-90%.</p>
                                    <p className="pExpli">-En color <span id="amarillo">amarillo</span> si el porcentaje coincidente es del 70-80%.</p>
                                    <p className="pExpli">
                                    Podrás consultar todas tus preguntas contestadas en la pestaña de 'Historial de respuestas'.

                                    
                                    </p>
                                  
                                    
                               
                                <p id="resp"className="pExpli">
                                <img className="img2" src={telf} />
                                    Para mas información contactar con un responsable.
                                    
                                </p>
                            </h5> 
                       
                </div>
    );
  }
}
export default Explicacion;