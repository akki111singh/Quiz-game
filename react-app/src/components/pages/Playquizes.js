import React, { Component } from 'react'
import Usernavbar from '../navigation/Usernavbar'
import PropTypes from "prop-types"
import {Redirect } from 'react-router-dom';

class Display_quizzes extends Component {

  constructor() {
    super();
    this.state = {
      data1:[],
      data: [],
      formData: {
        id:''
      },
      submitted: false
    }
    this.handleFChange = this.handleFChange.bind(this);
    this.handleFormSubmit=this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8081/fetchquizzes/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  async handleFormSubmit (event) {
    event.preventDefault();
    const request = new Request('http://127.0.0.1:8081/fetchquizzes/'+ this.state.formData.id)
    const response = await fetch(request);
    const status =await response.status;
    var data1=await response .json()
    this.setState({data1:data1})
    this.setState({submitted:true})

    console.log(this.state.data1)
  }

  handleFChange(event) {
    this.state.formData.id = event.target.value;
      localStorage.setItem("playid",parseInt(this.state.formData.id))
      }

  render() {
    return (
      <div>
      <Usernavbar/>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Select any quiz to play</h1>
        </header>

        <form onSubmit={this.handleFormSubmit}>
        <table class="ui celled table">
          <thead>
            <tr>
              <th>select</th>
              <th>Genre</th>
              <th>Quiz_name</th>

            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td><input type="radio" value={item.id} name="DELETE" onChange={this.handleFChange}/></td>
                      <td>{item.Genre}</td>
                      <td>{item.Quiz_name}</td>
                  </tr>
                )
             },this)}
          </tbody>
       </table>
       <button type="submit" className="btn btn-default">Play</button>
       { this.state.submitted && <Redirect to='/play' />}
       </form>
      </div>
      </div>
    );
  }
}

export default Display_quizzes
