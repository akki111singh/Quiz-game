import React from 'react'
import {Link} from 'react-router-dom';
import { logout } from "../../../actions/logout";
import { adminlogout } from "../../../actions/logout";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import Navbar from '../../navigation/Navbar'
class ViewPeople extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8081/people/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    return (
      <div>
      <Navbar/>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">All_Users</h1>
        </header>

        <table class="ui celled table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.Firstname}</td>
                      <td>{item.Lastname}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
      </div>
      </div>
    );
  }
}

export default ViewPeople;
