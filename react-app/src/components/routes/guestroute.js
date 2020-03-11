import React from 'react';
import PropTypes from 'prop-types';
import {Route,Redirect} from 'react-router-dom';
const Guestroute =({component:Component,...rest})=>(
  <Route {...rest} render={ props=> localStorage.getItem("isAuth").toString()==="false" ? <Component {...props} /> : <Redirect to="/dashboard" /> }/>
);
Guestroute.propTypes={
  component: PropTypes.func.isRequired
}
export default Guestroute;
