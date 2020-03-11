import React from 'react'
import {Form, Button,Message} from 'semantic-ui-react';
import InlineError from '../messages/InlineError';
import {Redirect } from 'react-router-dom';

class Loginform extends React.Component {
  state={
    data:{
      username:'',
      password:''
    },
    loading:false,
    submitted:false,
    invalid:false,
    errors:{}
  }
  onChange = e =>this.setState({ data:{...this.state.data,[e.target.name]:e.target.value}});
  onSubmit=()=>{
    const errors=this.validate(this.state.data);
    this.setState({errors});
    if(Object.keys(errors).length === 0)
    {
      this.setState({ loading: true });
      fetch('http://localhost:8081/Loginform/', {
       method: 'POST',
       body:JSON.stringify(this.state.data),
     })
        .then(response => {
          if(response.status === 200)
          {
          localStorage.setItem("isAuth", JSON.stringify(true));
          localStorage.setItem("username", JSON.stringify(this.state.data.username));
          this.setState({loading:false,submitted:true});
          }
          else if(response.status === 401)
          {
          localStorage.setItem("isAuth", JSON.stringify(false));
          this.setState({loading:false,submitted:false,invalid:true})
          this.props.submit(this.state.data)

        }
        });
    }
  }
  validate=(data)=>{
    const errors ={};
    if(!data.username) errors.username="cannot be blank";

    if(!data.password) errors.password="cannot be blank";
    if(data.password.length<5) errors.password="Set a strong password";
    return errors;
  }

  render(){
    const {data,errors,loading}=this.state;
    return(
      <div>
    <Form id="form" onSubmit={this.onSubmit} loading={loading}>
    { this.state.invalid && (<Message negative>
         <Message.Header>"Invalid credentials"</Message.Header>
         <p>{""}</p>
        </Message>
      )
    }
    <Form.Field  error={!!errors.username}>
    <label htmlFor="username">Username</label>
    <input
    type="text"
    id="username"
    name="username"
    placeholder="Username"
    value={data.username}
    onChange={this.onChange}
    />
    {errors.username && <InlineError text={errors.username}/>}
    </Form.Field>

    <Form.Field error={!!errors.password}>
    <label htmlFor="password">Password</label>
    <input
    type="password"
    id="password"
    name="password"
    placeholder="Make it secure"
    value={data.password}
    onChange={this.onChange}
    />
    {errors.password && <InlineError text={errors.password}/>}
    </Form.Field>
    <Button primary>Login</Button>
    </Form>
    { this.state.submitted && <Redirect to='/dashboard' />}
    </div>
  );
}
}
export default Loginform;
