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
      <div className="animated fadeIn fast login">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" 
                  placeholder="Introduce email..." value={this.state.email} onChange={this.handleChange}/>
          </div>
          <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input type="password" className="form-control" id="password" 
                    placeholder="Contraseña" value={this.state.password} onChange={this.handleChange}/>
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={!this.validateForm()}>Entrar</button>
        </form>
      </div>
    );
  }
}
export default Login;