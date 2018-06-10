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
        <div className="form-group col-md-6" id={this.props.item.order}>
            <label>{this.props.order}. {this.props.item.question}</label>
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
    );
  }
}
export default AnswerSeveral;


