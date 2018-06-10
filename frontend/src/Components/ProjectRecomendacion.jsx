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
    <section id="team" className="pb-5">
        <main className="recomendacion">
          <div className="card col-6 mx-auto">
            <div className="card-body">
              
              {this.state.projects.map(item => (
                <div key={item.name}>
                  <h1>{item.name}</h1>
                  <p>{item.description}</p>
                  <p>{item.location}</p>
                  <p>{item.workday}</p>
                  <p>Tecnologias</p>
                  <ul>
                    {item.technologies.map(technology => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                  <p>{item.schedule}</p>
                  <p>{item.telecommuting}</p>
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


