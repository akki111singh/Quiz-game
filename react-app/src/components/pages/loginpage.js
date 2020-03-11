import React from 'react'
import Loginform from '../forms/Loginform'
class Loginpage extends React.Component {
  submit=data=>{
    console.log(data);
  };
  render(){
    return(
    <div>
    <h1>Login page</h1>
    <Loginform submit={this.submit}/>
    </div>
  );
}
}
export default Loginpage;
