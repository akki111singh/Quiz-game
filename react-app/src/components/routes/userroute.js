import React from 'react';
import PropTypes from 'prop-types';
import {Route,Redirect} from 'react-router-dom';
const Userroute =({component:Component,...rest})=>(
  <Route {...rest} render={ props=> localStorage.getItem("isAuth").toString()==="true" ? <Component {...props} /> : <Redirect to="/" /> }/>
);
Userroute.propTypes={
  component: PropTypes.func.isRequired
}
export default Userroute;
