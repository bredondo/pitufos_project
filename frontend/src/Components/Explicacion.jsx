import React, { Component } from 'react';
class Explicacion extends Component {
  render() {
    return (
         
                <div className="container6" style={{color:'white'}}>
                  
                            <h1 className="display-2 mb-2">¿En qué consiste este<span style={{color:'rgb(96, 166, 206)'}}>Formulario?</span></h1>
                            <h5> 
                                <p > Con este cuestionario podrás conseguir un poco mas de información acerca del proyecto perfecto para tí, que se 
                                    adecue a tus necesidades, según tu sabiduría, preferencia de horario, movilidad y teletrabajo.
                                    Para realizarlo tendrás que contestar una serie de preguntas, y en función de la respuesta a la primera de ellas, 
                                    deberás calificar del 0 al 10 un conjunto de tecnologías relacionadas con tu respuesta en la pregunta número 1.
                                    Además, habrá unas preguntas básicas que aparecerán siempre, aunque en la primera pregunta respondas cosas diferentes, 
                                    como son las preguntas de movilidad, teletrabjo y horario.

                                    Una vez que todas las preguntas estén respondidas, tendrás que pulsar en el botón de enviar, y sseguidamente, 
                                    apereceŕa un resultado con los tres proyectos mas acordes según tus preferencias, ordenados según la coincidencia de tus respuestas
                                    con los proyectos ya existentes.

                                    Podrás consultar todas tus preguntas contestadas en la pestaña de 'Historial de respuestas'.

                                    Para mas información contactar con un responsable.
                                    
                                </p>
                            </h5> 
                       
                </div>
    );
  }
}
export default Explicacion;