import React from "react";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {adminlogout} from '../../actions/logout'
class Navbar extends React.Component
{
  render(){
    return(
  <div class="ui secondary pointing menu">
  <Link class="item" to={'/admindashboard'}>Home</Link>
  <Link class="item" to={'/createquiz'}>Create_Quiz</Link>
  <Link class="item" to={'/viewusers'}>View_users</Link>
  <Link class="item" to={'/userdelete'}>Delete_users</Link>

  <div class="ui dropdown">
  <div class="ui simple dropdown item">
    Edit_Quiz
    <i class="dropdown icon"></i>
    <div class="menu">
      <div class="item"><Link class="item" to={'/createquiz'}>Insert</Link></div>
      <div class="item"><Link class="item" to={'/deletequiz'}>Delete</Link></div>
    </div>
  </div>
</div>
<Menu.Menu position="right">
  <Dropdown >
    <Dropdown.Menu  >
      <Dropdown.Item onClick={() => adminlogout()}>Logout</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
</Menu.Menu>
  </div>
);
}}
export default Navbar;
