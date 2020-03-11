import React from 'react'
import Navbar from '../../navigation/Navbar'
let search=localStorage.getItem("id");
class Deletequiz extends React.Component {
  constructor() {
    super();
      this.state = {
        data1: [],
        formData: {
          id:""
        },
        submitted: false
  }
    this.handleFChange = this.handleFChange.bind(this);
    this.handleFormSubmit=this.handleFormSubmit.bind(this);
}

     async componentDidMount () {
      const request = new Request('http://127.0.0.1:8081/fetchquizzes/' + localStorage.getItem("id").toString());
      const response = await fetch(request);
      const status =await response.status;
      var data1 = await response.json()
      this.setState({data1:data1})
      this.setState({submitted:true})
    }

    handleFormSubmit (event) {
      event.preventDefault();
      fetch('http://localhost:8081/deletequiz/'+ this.state.formData.id , {
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

  render(){
    return(
    <div>
    <Navbar/>
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Delete Questions</h1>
      </header>

      <form onSubmit={this.handleFormSubmit}>
      <table class="ui celled table">
        <thead>
          <tr>
            <th>select</th>
            <th>Id</th>
            <th>Genre</th>
            <th>Quiz_name</th>
            <th>question</th>

          </tr>
        </thead>
        <tbody>{this.state.data1.map(function(item, key) {
             return (
                <tr key = {key}>
                    <td><input type="radio" value={item.id} name="DELETE" onChange={this.handleFChange}/></td>
                    <td>{item.id}</td>
                    <td>{item.genres}</td>
                    <td>{item.quiz_name}</td>
                    <td>{item.name}</td>

                </tr>
              )
           },this)}
        </tbody>
     </table>
     <button type="submit" className="btn btn-default">Submit</button>

     </form>
    </div>
    </div>
  );
}
}

export default Deletequiz;
