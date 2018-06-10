import React, { Component } from 'react';
class AnswerNumber extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.answers.length === 0 ? 0 : this.props.answers[0],
      border: { borderColor: '' },
    }
  }
  
  
  handleInputChange = (event) => {
    this.setState({value: event.target.value});
    this.props.handleChange(event);
    if(!event.target.checkValidity()){
      this.setState({text:this.state.text});
      this.setState({border:{ borderColor: 'red' }});
    }
    else{
      this.setState({text: ''});
      this.setState({border:{ borderColor: '' }});
    }
                
  }

  render() {
    return (
        <div className="form-group">
          <label>{this.props.order}. {this.props.item.question}</label>
          <input type="number" className="form-control col-md-4" min="0" max="10" style={this.state.border}
          value={this.state.value} onChange={(event) => this.handleInputChange(event)} />
          <small>* Rellena la respuesta con un número del 0 al 10</small>
        </div> 
    );
  }
}
export default AnswerNumber;


