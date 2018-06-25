import React, { Component } from "react";
import { myConfig } from '../config.js';
import Pagination from './Pagination';
import axios from 'axios';

class Proyectos extends Component {

    
    constructor(){
        super();
        this.state = {
            search: '', 
            projects: [], 
            page:0, 
            totalItems: 0,
            itemsPerPage: 0        
        };
        this.onChangePage = this.onChangePage.bind(this);
        
    }
    componentWillMount(){

        this.handleSearch(1);
    }
    handleSearch = async(page) => {
        try {
            let config = {
                'headers':{
                  'Content-Type': 'application/json',
                  'authorization': 'Bearer ' + localStorage.getItem('token')
                }
              }

            const pageSearch = +page - 1;
            
            const res = await axios.get(`${myConfig.url}/projectSearcher/?search=${this.state.search}&page=${pageSearch}`, config);
            const data = await res.data;
            
            this.setState({
                projects: data.result,
                itemsPerPage: data.itemsPerPage,
                totalItems: data.totalItems,
                page: page           
             });
        } catch (e) {
            console.log(e);
        }
    }
    
    handleChange = event =>  {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    onChangePage(page) {
        // update state with new page of items
        //this.handleSearch(page);
        
        if(page !== this.state.page){
            this.handleSearch(page);
        }       
    }

    handleKeyPress = event => {
        if (event.key === 'Enter' || event.target.innerText === "Buscar") {
            this.handleSearch(1);
        }
    }

    render() {

        return (
            <section className="animated fadeIn fast">
                <div className="container">
                    <h1 id="proyectostitle">Proyectos</h1>
                    <hr/>
                    <div className="row">
                        <div className="col">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Buscador..."  id="search" value={this.state.search} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
                                <div className="input-group-prepend">
                                    <button className="btn btn-outline-primary" type="button" disabled={this.state.search.length === 0} onClick={this.handleKeyPress}>Buscar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {this.state.projects.map(item => (
                            <div key={item.name} className="col-xs-12 col-sm-6 col-md-4">
                                <div id="cardBlack">
                                    <div className="row1">
                                        <h1 id="proyTit">{item.name}</h1>
                                        <p id="desc">{item.description}</p>
                                    </div>
                                    <p id="info">Lugar de trabajo</p><p> {item.location}</p>
                                    <p id="info">Tipo de jornada</p> <p>{item.workday}</p>
                                    <p id="info">Se trabajará con las siguientes tecnologías</p>
                                    <ul>
                                    {item.technologies.map(technology => (
                                        <li key={technology}>{technology}</li>
                                    ))}
                                    </ul>
                                    <p id="info">Horario de la jornada:</p> <p>{item.schedule}</p>
                                    <p id="info">Días de teletrabajo: </p> <p>{item.telecommuting}</p>
                                    </div>
                            </div>
                        ))}
                    </div>
                    <br/>
                    <div className="row offset-sm-0" id="pagproy">
                        <Pagination items={this.state.projects} onChangePage={this.onChangePage} totalItems={this.state.totalItems} pageSize={this.state.itemsPerPage} search={this.state.search} page={this.state.page}/>
                    </div>
                </div>
            </section>
        );
    }
}
 
export default Proyectos;