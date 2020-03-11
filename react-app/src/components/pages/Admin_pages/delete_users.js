import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { logout } from "../../../actions/logout";
import { adminlogout } from "../../../actions/logout";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import Navbar from '../../navigation/Navbar'

class ViewPeople extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      formData: {
        id:""
      },
      submitted: false
    }
    this.handleFChange = this.handleFChange.bind(this);
    this.handleFormSubmit=this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8081/people/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  handleFormSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8081/people/'+ this.state.formData.id , {
     method: 'DELETE',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300){
          this.componentDidMount();
          this.setState({submitted: true});}
      });

  }

  handleFChange(event) {
    this.state.formData.id = event.target.value;
  }

  render() {
    return (
      <div>
      <Navbar/>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Delete any Person</h1>
        </header>

        <form onSubmit={this.handleFormSubmit}>
        <table class="ui celled table">
          <thead>
            <tr>
              <th>select</th>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>

            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td><input type="radio" value={item.id} name="DELETE" onChange={this.handleFChange}/></td>
                      <td>{item.id}</td>
                      <td>{item.Firstname}</td>
                      <td>{item.Lastname}</td>

                  </tr>
                )
             },this)}
          </tbody>
       </table>
       <button type="submit" className="btn btn-default">DELETE</button>
       </form>
      </div>
      </div>
    );
  }
}

export default ViewPeople;
