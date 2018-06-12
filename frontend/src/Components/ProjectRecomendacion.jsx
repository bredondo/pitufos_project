import React, { Component } from 'react';

class ProjectRecomendacion extends Component {

  state = {}

  constructor(){
    super();
    this.state.projects = JSON.parse(localStorage.getItem('user')).result;
  }

  handleAgain(event) {
    this.props.handleAgain(event);
    event.preventDefault();
  }

  render() {

    return (
    <section id="team3" className="pb-5">
        <main className="recomendacion">
          <div className="card col-8 mx-auto">
            <div className="card-body">
               <h1 id="proy">Proyectos recomendados (% coincidencia)</h1>
              {this.state.projects.map(item => (
                    <div key={item.name} >
                      <h1>{item.name} 
                      {item.description.length < 1 ? '' : ' ('+  item.porcentaje * 100 + '%)'} </h1>
                      <p>{item.description}</p>
                      <p>{item.description.length < 1 ? '' : 'Lugar de trabajo: '+item.location}</p>
                      <p>{item.description.length < 1 ? '' : 'Tipo de jornada: ' + item.workday}</p>
                      <p> {item.description.length < 1 ? '' : 'Se trabajará con las siguientes tecnologías: '} </p>
                      <ul>
                        {item.technologies.map(technology => (
                          <li key={technology}>{technology}</li>
                        ))}
                      </ul>
                      <p>{item.description.length < 1 ? '' : 'Horario de la jornada: ' + item.schedule}</p>
                      <p>{item.description.length < 1 ? '' : 'Días de teletrabajo: ' + item.telecommuting}</p>
                    </div>
              ))}

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


