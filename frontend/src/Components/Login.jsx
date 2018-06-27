import React, { Component } from 'react';
import { myConfig } from '../config.js';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      message:""
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
      this.setState({message: ''});
    } catch (error) {
      this.setState({message: 'Error al iniciar sesión, prueba otra vez.'});
      setTimeout(()=>{
        this.setState({message: ''})
      }, 2000);
    }
  }

  render() {
    return (
        <section className="animated fadeIn fast pepe">
        { this.state.message !== '' ?

            <div class="alert alert-danger">
              <strong>¡Peligro!</strong> ¡Error al iniciar sesión, prueba otra vez!
            </div>

         : this.state.message === ''}
                  <div className="animated fadeIn fast login">
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

          </section>

    );
  }
}
export default Login;