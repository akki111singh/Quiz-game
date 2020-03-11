import React from "react";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {logout} from '../../actions/logout'
class Navbar extends React.Component
{
  render(){
    return(
  <div class="ui secondary pointing menu">
  <Link class="item" to={'/playquiz'}>Playquiz</Link>
  <Link class="item" to={'/leaderboard'}>Leaderboard</Link>
<Menu.Menu position="right">
  <Dropdown >
    <Dropdown.Menu  >
      <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
</Menu.Menu>
  </div>
);
}}
export default Navbar;
