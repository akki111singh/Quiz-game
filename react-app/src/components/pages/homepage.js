import React from 'react';
import {Link} from 'react-router-dom';
import { logout } from "../../actions/logout";
class Homepage extends React.Component {
  render(){
    const isLogIn=localStorage.getItem("isAuth")
    return(
    <div>
    { localStorage.getItem("isAuth").toString()==="true" ? (<button onClick ={()=>logout()}>Logout</button> ):(
      <ul>
      <li><Link to ="/login">Login</Link></li>
      <li><Link to ="/Signupform">Signup</Link></li>
      <li><Link to ="/adminlogin">Admin</Link></li>
      </ul>)
    }
    </div>
  );
}
}
export default Homepage;
