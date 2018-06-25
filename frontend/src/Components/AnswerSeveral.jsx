import React, { Component } from 'react';

class AnswerSeveral extends Component {
  handleInputChange = (event) => {
    this.props.handleChange(event);            
  }
  defaultInput = (answer) =>{
    for(let i = 0; i < this.props.answers.length; i++){
      if(this.props.answers[i] === answer){
        return true;
      }
    }
    return false;
  }
  render() {
    return (
      <div>

        <div>
          <h2 className="pregunta1">
                {this.props.item.order==1 ? <p>Tendrás que responder esta pregunta general para poder analizarte según tus respuestas. <p>
                  Luego se harán una serie de preguntas que se puntuarán del 0 al 10 según tus conocimientos, además de unas preguntas básicas acerca del horario, movilidad y teletrabajo.</p></p> 
                  : ''} 
              </h2>
        </div>
        <div className="form-group col-md-6" id={this.props.item.order}>
            <label className="preg1">{this.props.order}. {this.props.item.question}</label>
            {this.props.item.answers.map(answer => (
            <div className="form-check" key={answer}>
                <input className="form-check-input" defaultChecked={this.defaultInput(answer)} type={this.props.item.type === 'varias' ? 'checkbox' : 'radio'} value={answer} onChange={this.handleInputChange} name={this.props.item.order} id={answer} />
                <label className="form-check-label" htmlFor={answer}>
                {answer}
                </label>
            </div>
            ))}
            <small>{this.props.item.type === 'varias' ? '* Selecciona al menos una respuesta' : '* Selecciona una respuesta'} </small>
        </div>  
      </div>
    );
  }
}
export default AnswerSeveral;


