import React, { Component } from 'react';

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
    <section id="team3" className="pb-5">
        <main className="recomendacion">
          <div className="card mx-auto">
            <div className="card-body">
               <h1 id="proy">Proyectos recomendados (% coincidencia)</h1>
               <div className = "row">
                  {this.state.projects.map(item => (
                    <div className="col-xs-12 col-sm-6 col-md-4">
                      <div className={item.description.length < 1 ? "card2" : "card1"} id={item.description.length < 1 ? "card2" : "card1"}> 
                        <div  key={item.name} >
                            <div class="titlee">
                               <h1 id="proyTit">{item.name} 
                               <p className=
                                {(item.porcentaje*100 > 69 && item.porcentaje*100<80) ? "colorYellow": (item.porcentaje*100 > 79 && item.porcentaje*100<90) ? "colorOrange" : "colorGreen"}>
                                {item.description.length < 1 ? '' : ' ('+  item.porcentaje * 100 + '%)'} </p></h1>
                            </div>
                           
                            <p id="desc">{item.description}</p>
                            <p id="info">{item.description.length < 1 ? '' : 'Lugar de trabajo: '}</p><p> {item.location}</p>
                            <p id="info">{item.description.length < 1 ? '' : 'Tipo de jornada: '} </p> <p>{item.workday}</p>
                            <p id="info"> {item.description.length < 1 ? '' : 'Se trabajará con las siguientes tecnologías: '} </p>
                            <ul>
                              {item.technologies.map(technology => (
                                <li key={technology}>{technology}</li>
                              ))}
                            </ul>
                            <p id="info">{item.description.length < 1 ? '' : 'Horario de la jornada: '}</p> <p>{item.schedule}</p>
                            <p id="info">{item.description.length < 1 ? '' : 'Días de teletrabajo: '}</p> <p>{item.telecommuting}</p>
                          </div>
                        </div>
                    </div>
                  ))}
            </div>

              <div className="d-flex flex-nowrap">
                <div className="ml-auto p-2">
                  <button className="btn btn-dark" onClick={this.handleAgain.bind(this)}>
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


