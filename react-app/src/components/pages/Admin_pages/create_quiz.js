import React from "react"
import {Form, Button,Message} from 'semantic-ui-react';
import { Menu, Dropdown, Image } from "semantic-ui-react";
import Navbar from '../../navigation/Navbar'
class create_quiz extends React.Component {
  state = {
    Questions: [{name:"", options:"",o2:"",o3:"",o4:"",correct:""}],
    Genre: "",
    Quiz_name:""
  }
handleChange = (e) => {
    if (["name", "options","o2","o3","o4","correct"].includes(e.target.className) ) {
      let Questions = [...this.state.Questions]
      Questions[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
      this.setState({ Questions }, () => console.log(this.state))
    } else {
      this.setState({ [e.target.name]: e.target.value.toUpperCase() })
    }
  }

addquestion = (e) => {
    this.setState((prevState) => ({
      Questions: [...prevState.Questions, {name:"", options:"",o2:"",o3:"",o4:"",correct:""}],
    }));
  }
handleSubmit = (e) => {
  e.preventDefault()
  fetch('http://localhost:8081/createquiz/', {
     method: 'POST',
     body: JSON.stringify(this.state)
   })
}

render() {
    let {Genre, Questions,Quiz_name} = this.state

    return (
      <div>
      <Navbar/>

      <Form class="ui-form" onChange={this.handleChange}>

        <label htmlFor="Genre">Genre</label>
        <input type="text" name="Genre"  id="Genre" value={Genre}/>

        <label htmlFor="Quiz_name">Quiz name</label>
        <input type="text" name="Quiz_name" id="Quiz_name" value={Quiz_name} />

        <div>
        <button class="ui green button" onClick={this.addquestion}>Add Question</button>
        </div>
        </Form>

        <Form class="ui-form" onSubmit={this.handleSubmit} onChange={this.handleChange} >
        {
          Questions.map((val, idx)=> {
            Questions[idx].genres=Genre
            Questions[idx].quiz_name=Quiz_name

            let catId = `cat-${idx}`, optionsId = `options-${idx}`,o2Id=`o2-${idx}`,o3Id=`o3-${idx}`,o4Id=`o4-${idx}`,correctId=`correct-${idx}`
            return (
              <div  class="ui form" key={idx}>
                 <div class="field">
                <label htmlFor={catId}>{`Question #${idx + 1}`}</label>
                <input
                  type="text"
                  name={catId}
                  data-id={idx}
                  id={catId}
                  value={Questions[idx].name}
                  className="name"
                />
                </div>
                <div class="three fields">
                  <div class="field">
                <label htmlFor={optionsId}>option1</label>
                <input
                  type="text"
                  name={optionsId}
                  data-id={idx}
                  id={optionsId}
                  value={Questions[idx].options}
                  className="options"
                />
                </div>
                  <div class="field">
                <label htmlFor={o2Id}>option2</label>
                <input
                  type="text"
                  name={o2Id}
                  data-id={idx}
                  id={o2Id}
                  value={Questions[idx].o2}
                  className="o2"
                />
                </div>
                  <div class="field">
                <label htmlFor={o3Id}>option3</label>
                <input
                  type="text"
                  name={o3Id}
                  data-id={idx}
                  id={o3Id}
                  value={Questions[idx].o3}
                  className="o3"
                />
                </div>
                  <div class="field">
              <label htmlFor={o4Id}>option4</label>
              <input
                type="text"
                name={o4Id}
                data-id={idx}
                id={o4Id}
                value={Questions[idx].o4}
                className="o4"
              />
              </div>
              </div>
              <div >
          <label htmlFor={correctId}>Correct answer</label>
          <input
            type="text"
            name={correctId}
            data-id={idx}
            id={correctId}
            value={Questions[idx].correct}
            className="correct"
          />
          </div>
            </div>
            )
          })
        }
        <input onClick={()=>window.location.reload()}type="submit" value="Submit" />
      </Form>
      </div>
    )
  }
}
export default create_quiz;
