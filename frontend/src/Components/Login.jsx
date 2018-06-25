import React, { Component } from 'react';
import { myConfig } from '../config.js';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event =>  {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async (event) => {
    try {
      let config = {
        'headers':{
          'Content-Type': 'application/json'
        }
      }
      let body = {email: this.state.email, pass: this.state.password}
      const response = await axios.post(
        `${myConfig.url}/login`, 
        JSON.stringify(body), 
        config
      );
      const data = await response.data;
      localStorage.setItem('user',JSON.stringify(data.user))
      localStorage.setItem('token', data.token);
      this.props.updateIsAuth(true)
      this.props.history.push('/');//`${myConfig.url}/`
      
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div className="pepe animated fadeIn fast login">
       <p class="form-title">
                    Inicio de sesión</p>
        <form onSubmit={this.handleSubmit} className="login">
          <div className="form-group">
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" 
                  placeholder="Email" value={this.state.email} onChange={this.handleChange}/>
          </div>
          <div className="form-group">
              <input type="password" className="form-control" id="password" 
                  placeholder="Contraseña" value={this.state.password} onChange={this.handleChange}/>
          </div>
          <button type="submit" className="btn btn-dark btn-block" disabled={!this.validateForm()}>Entrar</button>
        </form>
      </div>
    );
  }
}
export default Login;