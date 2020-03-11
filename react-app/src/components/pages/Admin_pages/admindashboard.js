import React from 'react'
import {Link} from 'react-router-dom';
import { logout } from "../../../actions/logout";
import { adminlogout } from "../../../actions/logout";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import Navbar from '../../navigation/Navbar'
class Admindashboard extends React.Component {
  render(){
    return(
    <div>
    <div>
    { localStorage.getItem("isAdmin").toString()==="true"  ? (<Navbar/> ):(
      <ul>
      <li><Link to ="/adminlogin">Admin</Link></li>
      </ul>)
    }
    </div>
    <h1>Admin Dashboard</h1>
    </div>
  );
}
}
export default Admindashboard;
