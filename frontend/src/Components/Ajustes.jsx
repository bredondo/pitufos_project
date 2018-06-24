import React, { Component } from "react";
import { myConfig } from '../config.js';
import axios from 'axios';

class Ajustes extends Component {

  constructor(){
      super();
      let user = JSON.parse(localStorage.getItem('user'));
       
      this.state = { ...user, img_fluid: user.img, message: '' };
      console.log(this.state);
  }

    handleChange = event =>  {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    handleSubmit = async (event) => {
        try {
          let body = {email: this.state.email, description: this.state.description}
          let config = {
            'headers':{
              'Content-Type': 'application/json',
              'authorization': 'Bearer ' + localStorage.getItem('token')
            }
          }
          const response = await axios.put(
            `${myConfig.url}/user`, 
            JSON.stringify(body), 
            config
          );
          const data = await response.data;
          localStorage.setItem('user',JSON.stringify(data.result[0]));
          this.setState({message: 'Se ha guardado correctamente los cambios'})
          setTimeout(()=>{
              this.setState({message: ''})
          }, 2000);

        } catch (error) {
          console.error(error);
        }
      }
    handleUploadFile = (event) => {
        this.setState({
            [event.target.id]: event.target.files[0].name
        });
  }

  render() {

    return (
        <section className="animated fadeIn fast">
            { this.state.message !== '' ?
            <div className="row animated fadeIn fast">
                <div className="col-sm-3">
                </div>
                <div className="col-sm-6">
                    <div class="alert alert-success" role="alert">
                        {this.state.message}
                    </div>
                </div>
                <div className="col-sm-3">
                </div>
            </div>
            : <div></div>}
            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="text-center">
                                <img className="img-fluid rounded-circle mb-1"  style={{width:'30%'}} src={this.state.img_fluid} />
                                <h3 className="card-subtitle mb-2">
                                    {this.state.name + ' ' + this.state.lastname}
                                </h3>
                                <h4 className="text-muted"><small>{this.state.email}</small></h4>
                                <hr/>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <h3 className="card-title">Editar mis datos</h3>
                                <div className="form-group">
                                    <label htmlFor="descripcion">Descripción</label>
                                    <textarea className="form-control" id="description" rows="3" value={this.state.description} onChange={this.handleChange}></textarea>
                                </div>
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="img" accept="image/png, image/jpeg" onChange={this.handleUploadFile}/>
                                    <label className="custom-file-label" htmlFor="inputGroupFile01">{this.state.img}</label>
                                </div>
                                <div className="text-right">
                                    <br/>
                                    <button type="submit" className="btn btn-block btn-primary">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3"></div>
            </div>
        </section>
      );
    }
}
 
export default Ajustes;