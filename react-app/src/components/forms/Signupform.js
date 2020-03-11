import React from 'react'
import {Form, Button,Message} from 'semantic-ui-react';
import InlineError from '../messages/InlineError'
class Signupform extends React.Component {
  state={
    data:{
      Firstname:'',
      Lastname:'',
      Username:'',
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
      this.setState({ loading:true });
      fetch('http://localhost:8081/Signupform/', {
       method: 'POST',
       body: JSON.stringify(this.state.data),
     })
        .then(response => {
          if(response.status === 200)
          this.setState({loading:false,submitted:true})
          else if(response.status === 401)
          {
            this.setState({invalid:true})
            this.setState({loading:false,submitted:false})
          }

          });
    }
    document.getElementById('form').reset()
    this.setState({
      data:{
        Firstname:'',
        Lastname:'',
        Username:'',
        password:''
      },
      loading:false,
      errors:{},
      invalid:false,
      submitted:false,
    })
  }
  validate=(data)=>{
    const errors ={};
    if(!data.Firstname) errors.Firstname="cannot be blank";
    if(!data.Lastname)  errors.Lastname="cannot be blank";
    if(!data.Username)  errors.Username="cannot be blank";
    if(!data.password)  errors.password="cannot be blank";
    if(data.password.length<5) errors.password="Set a strong password";
    return errors;
  }

  render(){
    const {data,errors,loading}=this.state;
    return(
    <Form id="form" onSubmit={this.onSubmit} loading={loading}>

      { this.state.submitted && (<Message positive>
           <Message.Header>Registered Successfully</Message.Header>
           <p>{"Go to the login page to login"}</p>
          </Message>
        )
      }
      { this.state.invalid&& (<Message negative>
           <Message.Header>"Username already Exists"</Message.Header>
           <p>{"Please register with new username"}</p>
          </Message>
        )
      }

    <Form.Field error={!!errors.Firstname}>
    <label htmlFor="Firstname">Firstname</label>
    <input
    type="text"
    id="Firstname"
    name="Firstname"
    placeholder="Firstname"
    value={data.Firstname}
    onChange={this.onChange}
    />
    {errors.Firstname && <InlineError text={errors.Firstname}/>}
    </Form.Field>

    <Form.Field error={!!errors.Lastname}>
    <label htmlFor="Lastname">Lastname</label>
    <input
    type="text"
    id="Lastname"
    name="Lastname"
    placeholder="Lastname"
    value={data.Lastname}
    onChange={this.onChange}
    />
    {errors.Lastname && <InlineError text={errors.Lastname}/>}

    </Form.Field>
    <Form.Field error={!!errors.Username}>
    <label htmlFor="Username">Username</label>
    <input
    type="text"
    id="Username"
    name="Username"
    placeholder="Username"
    value={data.Username}
    onChange={this.onChange}
    />
    {errors.Username && <InlineError text={errors.Username}/>}
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
    <Button primary>Signup</Button>
    </Form>
    );
}
}
export default Signupform;
