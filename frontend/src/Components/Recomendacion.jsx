import React, { Component } from 'react';
import AnswerNumber from './AnswerNumber';
import AnswerSeveral from './AnswerSeveral';
import { myConfig } from '../config.js';
import axios from 'axios';


class Recomendacion extends Component {
 
  state = {
    recommendation: [],
    stylesPrev: { display: "none" },
    stylesNext: { display: ""},
    stylesSave: { display: "none" },
    index: 0,
    answers: [[]],
    numberQuestion: 0, 
    preg:[]
  }



  async componentDidMount() {
    
    try {

      let config = {
        'headers':{
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }

      const response = await axios.get(`${myConfig.url}/recommendationStart`, config); 
      const recommendation = await response.data; 

      this.setState({
        recommendation: recommendation.result,
      })
    } catch (e) {
      console.log(e);
    }
  }

  recommendationKeepsGoing(body) {
    let config = {
      'headers':{
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }
    return axios.post(
      `${myConfig.url}/recommendationKeepsGoing`, 
      JSON.stringify(body), 
      config);
  }

  handleChange(event) {
    let item = event.target.value;
    let checked = event.target.checked;
    let answers = this.state.answers;
    if(checked){
      answers[this.state.index].push(item);
      this.setState({answers:answers});
      
    }
    else{
      if(this.state.recommendation[this.state.index].type !== 'varias'){
        answers[this.state.index] = [];
        if(item !== "" && event.target.checkValidity())
          answers[this.state.index].push(item);
        this.setState({answers:answers});
      }
      else{
        let index = answers[this.state.index].indexOf(item);
        if (index !== -1){
          answers[this.state.index].splice(index, 1);
          this.setState({answers:answers});
        }
      }
    }
  }

  answerType(item = 0, index = 0) {
    if(item === 0){
      return;
    }
    let order = this.state.index + 1;
    if(item.answers.length > 0){
      return <AnswerSeveral key={index} order={order} item={item} answers={this.state.answers[this.state.index]} handleChange={this.handleChange.bind(this)}/>;
    }
    else{
      return <AnswerNumber key={index} order={order} item={item} answers={this.state.answers[this.state.index]} handleChange={this.handleChange.bind(this)}/>;
    }
  }

  handleNext(event) {

    if(this.state.answers[this.state.index].length > 0){
      if(this.state.index === 0){
        const body = {"technologies": this.state.answers[this.state.index]};
        this.recommendationKeepsGoing(body)
          .then((response) =>{
            const recommendation = response.data;
            let recomendacionState = this.state.recommendation;
            recomendacionState.splice(1);
            recomendacionState = recomendacionState.concat(recommendation.result);
            this.numberQuestion=recomendacionState.length-1;
            console.log("umer question: " + this.numberQuestion);
            this.setState({recommendation: recomendacionState});
            this.state.answers.splice(1);
            this.setState({answers: this.state.answers});
            this.displayNext();
          })
          .catch((error) =>{
            console.log(error);
          });
      }
      else{
        this.displayNext();
      }
      event.preventDefault();
    }
  }
  displayNext(){
    if(this.state.index < this.state.recommendation.length){
      this.state.answers;
      let answers = this.state.answers;
      answers.push([]);
      let index = this.state.index;
      index++;
      this.setState({answers: answers});
      this.setState({index: index});
      this.setState({stylesPrev: {display: ""}});
      if(index === this.state.recommendation.length -1){
        this.setState({stylesNext: {display: "none"}});
        this.setState({stylesSave: {display: ""}});
      }
    }
  }

  displayNextQuestion(){

    if(this.state.index < this.state.recommendation.length){
      this.state.answers;
      let answers = this.state.answers;
      answers.push([]);
      let index = this.state.index;
      index++;
      this.setState({answers: answers});
      this.setState({index: index});
      this.setState({stylesPrev: {display: ""}});
      if(index === this.state.recommendation.length -1){
        this.setState({stylesNext: {display: "none"}});
        this.setState({stylesSave: {display: ""}});
      }
    }
  }

  handlePrevious(event) {
    if(this.state.index > 0){
      let index = this.state.index;
      index--;
      this.setState({index: index});
      this.setState({stylesNext: {display: ""}});
      this.setState({stylesSave: {display: "none"}});
      if(index === 0){
        this.setState({stylesPrev: {display: "none"}});
      }
    }  
  }

  handleQuestion(event){
    this.setState({index:event.target.innerHTML-1});
      console.log('indice pregunta: '+ this.state.index);
  } 

  handleSave(event) {
    let config = {
      'headers':{
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }
    let body = {"result":
                {
                  "user": JSON.parse(localStorage.getItem('user')),
                  "answers": []
                }
              };

    for(let i = 1; i < this.state.recommendation.length; i++){
      body.result.answers.push({
        "question": this.state.recommendation[i].question,
        "type": this.state.recommendation[i].type,
        "order": this.state.recommendation[i].order,
        "answers": this.state.answers[i]
      });
    }
    

    axios.post(
      `${myConfig.url}/projectRecommendation`,
      JSON.stringify(body), 
      config)
        .then((response) =>{
          console.log("Guardado recomendación")
          localStorage.setItem('user', JSON.stringify(response.data.result));
          this.props.handleSend(event);
        })
        .catch((error) =>{
          console.log(error);
        });
  }
 
  render() {

    return (

        <div class="container animated fadeIn fast">
          <div className="row">
          <div className="stepwizard">

                       { this.state.index !=0 ? 
                            <h1 className="preguntas"> Pregunta {this.state.index+1}/{this.numberQuestion+1}</h1>
                           
                                : ""
                      }

                       <div className="card col-7 mx-auto"> 
                          <div class="card-body">
                              <div className="row">
                                      <div className="form-group" >
                                          {
                                            this.answerType(this.state.recommendation[this.state.index], this.state.index)
                                          }
                                          <div className="d-flex flex-nowrap">
                                                
                                                <div className="p-2">
                                                  <button className="btn" style={this.state.stylesPrev} 
                                                        onClick={this.handlePrevious.bind(this)}>
                                                    <span>&laquo;</span> Atrás
                                                  </button>
                                                </div>
                                            
                                                <div className="ml-auto p-2">
                                                  <button className="btn btn-dark" style={this.state.stylesNext} 
                                                          onClick={this.handleNext.bind(this)} disabled={this.state.answers[this.state.index].length === 0}>
                                                    Siguiente <span>&raquo;</span>
                                                  </button>
                                                  <button className="btn btn-dark" style={this.state.stylesSave} 
                                                          onClick={this.handleSave.bind(this)} disabled={this.state.answers[this.state.index].length === 0}>
                                                    <i class="far fa-save"></i> Enviar
                                                  </button>
                                                </div>
                                                
                                          </div>
                                    </div>
                              </div>
                            
                          </div>          
                         
                    </div>
            </div>
    
          </div>
        </div>

    );
  }
}
export default Recomendacion;


