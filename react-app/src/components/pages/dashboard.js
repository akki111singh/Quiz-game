import React from 'react'
import {Link} from 'react-router-dom';
import Usernavbar from '../navigation/Usernavbar'
class dashboard extends React.Component {
  render(){
    return(
      <div>
      <Usernavbar/>
    <h1>WELCOME  {localStorage.getItem("username")}</h1>
    </div>
  );
}
}
export default dashboard;
