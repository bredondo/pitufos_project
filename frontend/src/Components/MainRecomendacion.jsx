import React, { Component } from 'react';
import Recomendacion from './Recomendacion';
import ProjectRecomendacion from './ProjectRecomendacion';

class MainRecomendacion extends Component {
 
  state = {}

  constructor(){
    super();
    let user = JSON.parse(localStorage.getItem('user'));
    if(user.result.length === 0){
      this.state.resultIsEmpty = true;
    }
    else{
      this.state.resultIsEmpty = false;
    }
  }

  handleAgain(){
    this.setState({resultIsEmpty: true});
  }

  handleSend(){
    this.setState({resultIsEmpty: false});
  }

  recommendationPage() {
    if(!this.state.resultIsEmpty){
      
      return <ProjectRecomendacion handleAgain={this.handleAgain.bind(this)}/>;
    }
    else{
      return <Recomendacion handleSend={this.handleSend.bind(this)}/>;
    }
  }

  render() {

    return (
    <section className="animated fadeIn fast">
        {
          this.recommendationPage()
        }
     </section>
    );
  }
}
export default MainRecomendacion;


