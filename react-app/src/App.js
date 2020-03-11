import React,{Component} from 'react';
import {Route} from 'react-router-dom';
import homepage from './components/pages/homepage';
import 'semantic-ui-css/semantic.min.css';
import loginpage from './components/pages/loginpage';
import Adminlogin from './components/pages/Adminlogin';
import signuppage from './components/pages/signuppage';
import Userroute from './components/routes/userroute';
import Guestroute from './components/routes/guestroute';
import Adminroutes from './components/routes/Adminroutes';
import dashboard from './components/pages/dashboard';
import admindashboard from './components/pages/Admin_pages/admindashboard';
import view_users from './components/pages/Admin_pages/view_users';
import delete_quiz from './components/pages/Admin_pages/delete_quiz';
import create_quiz from './components/pages/Admin_pages/create_quiz';
import delete_users from './components/pages/Admin_pages/delete_users';
import edit_quiz from './components/pages/Admin_pages/edit_quiz';
import Playquizes from './components/pages/Playquizes';
import leaderboard from './components/pages/leaderboard';
import play from './components/pages/play';

const App =()=>(
      <div className="ui container">
      <Route exact path="/" component={homepage}/>
      <Guestroute exact path="/login" component={loginpage}/>
      <Guestroute exact path="/Signupform" component={signuppage}/>
      <Guestroute exact path="/Adminlogin" component={Adminlogin}/>
      <Adminroutes exact path="/admindashboard" component={admindashboard}/>
      <Userroute exact path="/dashboard" component={dashboard}/>
      <Userroute exact path="/playquiz" component={Playquizes}/>
      <Adminroutes exact path="/createquiz" component={create_quiz}/>
      <Adminroutes exact path="/viewusers" component={view_users}/>
      <Adminroutes exact path="/userdelete" component={delete_users}/>
      <Adminroutes exact path="/deletequiz" component={delete_quiz}/>
      <Adminroutes exact path="/editquiz" component={edit_quiz}/>
      <Userroute exact path="/leaderboard" component={leaderboard}/>
      <Userroute exact path="/play" component={play}/>
      </div>
    );
export default App;
