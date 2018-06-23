import React, { Component } from "react";
import { myConfig } from '../config.js';
import axios from 'axios';

class Contactos extends Component {

  state = {
    contacto: [
     ]
  };

  async componentDidMount() {
    try {
      let config = {
        'headers':{
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
      const res = await axios.get(`${myConfig.url}/users`, config);
      const users = await res.data;

      this.setState({
        contacto: users.result,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {

    return (
        <div className="content">
             <div className="card">
             {this.state.contacto.map(item => (
                 <div className="firstinfo col-xs-12 col-sm-12 col-md-12" key={item.email}>
                        <img className="img-fluid" src={item.img} />
                         <div  className="jj card-body text-center">
                             <h2 id="h2n">
                                 {item.name} <span>{item.lastname}</span>
                             </h2>
                             <p>
                                 {item.description}
                             </p>
                             <p>
                                 {item.email}
                             </p>
                         </div>

                 </div>
                 ))}
             </div>
      </div>
      );
 
   

  
  }
}
 
export default Contactos;