import React, { Component } from 'react';
import lugar from './lugar.png';
import jornada from './jornada.png';
import tecno from './tecno.png';
import calendario from './calen.png';
import teletrabajo from './tele.png';

class ProjectRecomendacion extends Component {

  state = {}

  constructor(){
    super();
    this.state.projects = JSON.parse(localStorage.getItem('user')).result[0];
  }

  handleAgain(event) {
    this.props.handleAgain(event);
    event.preventDefault();
  }

  render() {

    return (
    <section id="team3" className="pb-5 animated fadeIn fast">
        <main className="recomendacion">
          <div className="card mx-auto">
            <div className="card-body">
               <h1 id="proy">Proyectos recomendados (% coincidencia) 
               <div className="d-flex flex-nowrap">
                <div className="ml-auto p-2">
                  <button className="btn btn-dark" onClick={this.handleAgain.bind(this)}>
                    Realizar de nuevo 
                  </button>
                </div>

              </div></h1>
               <div className="row">
                  {this.state.projects.map(item => (
                    <div className="col-xs-12 col-sm-6 col-md-4"  key={item.name}>
                           <div className={item.description.length < 1 ? "card2 h-100" : (item.porcentaje*100 > 69 && item.porcentaje*100<80) ? "cardYellow": (item.porcentaje*100 > 79 && item.porcentaje*100<90) ? "cardOrange" : "cardGreen"} id={item.description.length < 1 ? "card2" : (item.porcentaje*100 > 69 && item.porcentaje*100<80) ? "cardYellow": (item.porcentaje*100 > 79 && item.porcentaje*100<90) ? "cardOrange" : "cardGreen"}>
                            <div  key={item.name} >
                                  <div className="row1">
                                    <h1 id="proyTit">{item.name} 
                                        <p className=
                                          {(item.porcentaje*100 > 69 && item.porcentaje*100<80) ? "colorYellow": (item.porcentaje*100 > 79 && item.porcentaje*100<90) ? "colorOrange" : "colorGreen"}>
                                          {item.description.length < 1 ? '' : ' ('+  item.porcentaje * 100 + '%)'} </p></h1>
                                          <p id="desc">{item.description}</p>
                                  </div>
                                  <div className="row2">
                                        <p id="info" > 
{item.description.length < 1 ? '' : 'Lugar de trabajo: '} <i className="fas fa-map-marker"></i> </p><p> {item.location} </p>
                                        <p id="info">{item.description.length < 1 ? '' : 'Tipo de jornada: '} <i class="far fa-clock"></i></p> <p>{item.workday}</p>
                                        <p id="info"> {item.description.length < 1 ? '' : 'Se trabajará con las siguientes tecnologías: '} <i class="fas fa-code"></i></p>
                                        <ul>
                                          {item.technologies.map(technology => (
                                            <li key={technology}>{technology}</li>
                                          ))}
                                        </ul>
                                  </div>
                                 <div className="row3">
                                    <p id="info">{item.description.length < 1 ? '' : 'Horario de la jornada: '} <i class="far fa-calendar-alt"></i></p> <p>{item.schedule}</p>
                                    <p id="info">{item.description.length < 1 ? '' : 'Días de teletrabajo: '}<i class="fas fa-home"></i></p> <p>{item.telecommuting}</p>
                                 </div>
                                   </div>
                            </div>
                      </div>
                  ))}
            </div>
            </div>
          </div>
        </main>
     </section>
    );
  }
}
export default ProjectRecomendacion;


