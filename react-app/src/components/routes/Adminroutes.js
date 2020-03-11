import React from 'react';
import PropTypes from 'prop-types';
import {Route,Redirect} from 'react-router-dom';
const Adminroute =({component:Component,...rest})=>(
  <Route {...rest} render={ props=> localStorage.getItem("isAdmin").toString()==="true" ? <Component {...props} /> : <Redirect to="/" /> }/>
);
Adminroute.propTypes={
  component: PropTypes.func.isRequired
}
export default Adminroute;
