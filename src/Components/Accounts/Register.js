import React, {Component} from 'react';
import {Form, FormText } from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register} from "../../actions/auth";
import { createMessage } from "../../actions/messages";
import "./Register.css"


class Register extends Component {
  state ={
    first_name:"",
    last_name:"",
    username:"",
    email:"",
    password:"",
    password2:"",
  }

  static propTypes ={
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  }


  onSubmit = e =>{

    e.preventDefault();
    const { first_name, last_name, username, email, password, password2} = this.state;
    if(password !== password2){
      this.props.createMessage({ passwordNotMatch: 'Passwords do not match'})
    }else if (username.length > 8){
      this.props.createMessage({ usernameTooBig: 'Username too long'})
    } else{
       const newUser = {
        first_name,
         surname: last_name,
         username,
         password,
         email,

       }
       this.props.register(newUser);
    }
  }



  onChange = e => this.setState({[e.target.name]: e.target.value})



  render() {
    if(this.props.isAuthenticated){
       return <Redirect to="/" />
    }

    const { first_name, last_name, username, email, password, password2 } = this.state;

    return (
      <Form onSubmit={this.onSubmit} className="col-lg-4 col-centered auth-wrapper auth-inner" >
        <h3 className="forms_text">Register</h3>
        <Form.Group  controlId="formBasicName" className="form-group">
          <Form.Label className="forms_label">Firstname</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="first_name"
            placeholder="Enter name"
            onChange={this.onChange}
            value={first_name}
            required="required"
          />
        </Form.Group>
        <Form.Group controlId="formBasicSurname">
          <Form.Label className="forms_label">Surname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter surname"
            name="last_name"
            onChange={this.onChange}
            value={last_name}
            required="required"
          />
        </Form.Group>
        <Form.Group controlId="validationCustom01">
          <Form.Label className="forms_label">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            className="form-control"
            name="username"
            onChange={this.onChange}
            value={username}
            required="required"
          />
          <React.Fragment>
            {this.state.username.length > 8 && <div className="invalid-feedback d-block">Username is greater than 8 characters.</div>}
          </React.Fragment>

          <FormText>Validation is based on string length.</FormText>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="forms_label">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            className="form-control"
            name="email"
            onChange={this.onChange}
            value={email}
            required="required"
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label className="forms_label">Password</Form.Label>
          <Form.Control
            type="password"
            autoComplete="on"
            placeholder="Enter password"
            className="form-control"
            name="password"
            onChange={this.onChange}
            value={password}
            required="required"
          />
        </Form.Group>
        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label className="forms_label">Confirm Password</Form.Label>
          <Form.Control
            type="password"
            autoComplete="on"
            placeholder="Confirm password"
            className="form-control"
            name="password2"
            onChange={this.onChange}
            value={password2}
            required="required"
          />
        </Form.Group>
        <button type="submit" className="btn btn-primary btn-block" variant="primary">
          Register
        </button>
        <p>
          Already have an account?
          <Link to="/login">Login</Link>
        </p>
      </Form>
    );
  }
}


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, {register, createMessage})(Register);

