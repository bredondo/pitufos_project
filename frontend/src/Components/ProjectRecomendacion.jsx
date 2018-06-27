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
  getComponent(show){
    return show ? <i className="fas fa-map-marker"></i> : '';
  }
  getComponent2(show){
    return show ? <i className="far fa-clock"></i>  : '';
  }
  getComponent3(show){
    return show ? <i className="fas fa-code"></i>: '';
  }
  getComponent4(show){
    return show ? <i className="far fa-calendar-alt"></i>  : '';
  }
  getComponent5(show){
    return show ? <i className="fas fa-home"></i> : '';
  }
  render() {

    return (
    <section id="team3" className="pb-5 animated fadeIn fast">
        <main className="recomendacion">
          <div className="card mx-auto">
            <div className="card-body">
               <h1 id="proy">Proyectos recomendados (% coincidencia) </h1>
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
                                        <p id="info">{item.description.length < 1 ? '' : `Lugar de trabajo:  `}{this.getComponent(item.description.length > 1)} </p>
                                        <p> {item.location} </p>
                                        <p id="info">{item.description.length < 1 ? '' : 'Tipo de jornada: '} {this.getComponent2(item.description.length > 1)}  </p> <p>{item.workday}</p>
                                        <p id="info"> {item.description.length < 1 ? '' : 'Se trabajará con las siguientes tecnologías: '} {this.getComponent3(item.description.length > 1)} </p>
                                        <ul>
                                          {item.technologies.map(technology => (
                                            <li key={technology}>{technology}</li>
                                          ))}
                                        </ul>
                                  </div>
                                 <div className="row3">
                                    <p id="info">{item.description.length < 1 ? '' : 'Horario de la jornada: '}{this.getComponent4(item.description.length > 1)} </p> <p>{item.schedule}</p>
                                    <p id="info">{item.description.length < 1 ? '' : 'Días de teletrabajo: '} {this.getComponent5(item.description.length > 1)} </p> <p>{item.telecommuting}</p>                               
                                 </div>
                                   </div>
                            </div>
                      </div>
                  ))}
            </div>
            <div className="holi d-flex flex-nowrap">
                <div className="col-md-12 center-block">
                  <button className="btn btn-dark"  onClick={this.handleAgain.bind(this)}>
                    Realizar de nuevo 
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
     </section>
    );
  }
}
export default ProjectRecomendacion;


