import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLead } from '../../actions/leads'
import "./RegisterUserList.css"


class LeadForm extends Component {
  state ={
    name:"",
    surname:"",
    email:"",
  }

  static propTypes = {
    addLead: PropTypes.func.isRequired
  }

  onChange = e => this.setState({[e.target.name]: e.target.value});
  onSubmit = e => {
    e.preventDefault();
    const { name, surname, email} =this.state;
    const lead = {name, surname, email}
    this.props.addLead(lead)
    this.setState({
      name:"",
      surname:"",
      email:"",
    });
    console.log("Submit...");
  }
  render() {
    const { name, surname, email } = this.state;
    return (
        <Form onSubmit={this.onSubmit} className="col-lg-4 col-centered auth-wrapper-userForm auth-inner-userForm" >
          <h3 className="forms_text-userForm">Add New User</h3>
          <Form.Group controlId="formBasicName" className="form-group">
            <Form.Label className="forms_label-userForm">Name</Form.Label>
            <Form.Control
              className="form-control"
              type="text"
              name="name"
              placeholder="Enter name"
              onChange={this.onChange}
              value={name}
              required="required"
            />
          </Form.Group>
          <Form.Group controlId="formBasicSurname">
            <Form.Label className="forms_label-userForm">Surname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter surname"
              name="surname"
              onChange={this.onChange}
              value={surname}
              required="required"
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="forms_label-userForm">Email address</Form.Label>
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
            <button type="submit" className="btn btn-primary btn-block" variant="primary">
              Submit
            </button>
        </Form>
    );
  }
}

export default connect(null, { addLead })(LeadForm);


