import React, { Component } from "react";

class Contactos extends Component {

  state = {
    contacto: [
     ]
  };

  async componentDidMount() {
    try {
      const res = await fetch('http://34.244.218.28:80/users');
      const users = await res.json();

      this.setState({
        contacto: users.result,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
    <section id="team" className="pb-5">
        <div className ="container">
            <div className = "row">
                {this.state.contacto.map(item => (
                <div className="col-xs-12 col-sm-6 col-md-4" key={item.email}>
                    <div className="image-flip">
                        <div className="mainflip">
                            <div className="frontside">
                                <div className="card">
                                    <div className="card-body text-center">
                                        <p><img className=" img-fluid" src={item.img} /></p>
                                        <h4 className="card-title">{item.name} {item.lastname}</h4>
                                        <p className="card-text">{item.email}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="backside">
                                <div className="card">
                                    <div className="card-body text-center mt-4">
                                        <h4 className="card-title">{item.name}</h4>
                                        <p className="card-text"> {item.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </section>
    );
  }
}
 
export default Contactos;
