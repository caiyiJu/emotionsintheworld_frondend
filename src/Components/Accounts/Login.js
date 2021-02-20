import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login} from "../../actions/auth";
import "./Login.css"

class Login extends Component {
  state ={
    username:"",
    password:""
  }

  static propTypes ={
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  }

  onSubmit = e =>{
    e.preventDefault();
    this.props.login(this.state.username, this.state.password)
  }


  onChange = e =>this.setState({[e.target.name]: e.target.value})

  render() {
    if(this.props.isAuthenticated){
      console.log("this.props.isAuthenticated: " + this.props.isAuthenticated);
      return <Redirect to="/" />
    }
    const { username, password } = this.state;
    return (
      <Form onSubmit={this.onSubmit} className="col-lg-4 col-centered auth-wrapper auth-inner" >
        <h3 className="forms_text">Login</h3>
        <Form.Group controlId="formBasicUserName">
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
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="forms_label">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            className="form-control"
            name="password"
            onChange={this.onChange}
            value={password}
            required="required"
          />
        </Form.Group>
        <button type="submit" className="btn btn-primary btn-block" variant="primary">
          Login
        </button>
        <p>
          Don't have an account?
          <Link to="/register">Register</Link>
        </p>
      </Form>
    );
  }
}


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, {login})(Login);
