import React from 'react'
import Usernavbar from '../navigation/Usernavbar'
import 'semantic-ui-css/semantic.min.css';
import {Form, Button,Message,Checkbox} from 'semantic-ui-react'
class Playquiz extends React.Component {
  constructor() {
    super();
      this.state = {
        data1: [],
        formData: {
          id:""
        },
        submitted: false,
        value:[],
        stri :""
  }
    this.handleFChange = this.handleFChange.bind(this);
    this.handleFormSubmit=this.handleFormSubmit.bind(this);
    this.handleAChange = this.handleAChange.bind(this)
    this.submit = this.submit.bind(this)

}
 handleChange = (e, { value }) => this.setState({ value })

     async componentDidMount () {
      const request = new Request('http://127.0.0.1:8081/fetchquizzes/' + localStorage.getItem("playid").toString());
      const response = await fetch(request);
      const status =await response.status;
      var data1 = await response.json()
      this.setState({data1:data1})
      this.setState({submitted:true})

    }

    handleAChange(event){
       if(this.state.data1[event.target.getAttribute('data-qno')].attempted[event.target.value-1] == 1){
       this.state.data1[event.target.getAttribute('data-qno')].attempted[event.target.value-1] = 0
     }
     else {
       this.state.data1[event.target.getAttribute('data-qno')].attempted[event.target.value-1] = 1
       this.state.stri = this.state.stri + event.target.getAttribute('rand-val')

     }
     }


     submit(event){
       event.preventDefault()
       var str = ""
       for(let i=0;i<this.state.data1.length;i++){
         str = this.state.data1[i].correct.toString()
         let str1 = this.state.data1[i].attempted[0].toString() ;

         console.log(this.state.stri)
         console.log(str)
         if(this.state.stri === str)
         {
           this.state.score++;
         }
}
       alert('Score' + ":" + this.state.score )
       window.location = "http://localhost:3000/dashboard"
     }

    async handleFormSubmit (event) {
      event.preventDefault();
      const request = new Request('http://127.0.0.1:8081/play/'+ this.state.formData.id)
      const response = await fetch(request);
      const status =await response.status;
      var data1=await response .json()
      this.setState({data1:data1})
      this.setState({submitted:true})
      console.log(this.state.data1)
    }

    handleFChange(event) {
      this.state.formData.id = event.target.value;
    }
    render() {
      for(let i=0;i<this.state.data1.length;i++){
        this.state.data1[i].attempted = [0,0,0,0]

}
    return(

      <div>
      <h1>Quiz</h1>
      <div >
        <table class="ui celled table">
          <thead>
            <tr>
              <th>Ques</th>
            </tr>
          </thead>
          <tbody>{this.state.data1.map(function(item, key) {
               return (
                  <tr key = {key}>
                  <div>
                      <td>{item.name}</td>
                  </div>

                  <td><input type="checkbox" data-qno={key} rand-val={item.options} value={1} onClick={this.handleAChange} /></td>
                      <td>{item.options}</td>
                  <td><input type="checkbox" data-qno={key} rand-val={item.o2} value={2} onClick={this.handleAChange}/></td>
                      <td>{item.o2}</td>
                  <td><input type="checkbox" data-qno={key} value={3}  rand-val={item.o3} onClick={this.handleAChange}/></td>
                      <td>{item.o3}</td>
                  <td><input type="checkbox" data-qno={key} value={4} rand-val={item.o4} onClick={this.handleAChange}/></td>
                      <td>{item.o4}</td>
                  </tr>
                )
             },this)}
          </tbody>

       </table>
        <button onClick={this.submit}>Submit</button>
      </div>
      </div>

    );
  }
}

    export default Playquiz
