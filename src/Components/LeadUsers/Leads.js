import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import { getLeads, deleteLead } from '../../actions/leads';
import {Table} from "react-bootstrap";
import "./RegisterUserList.css"



class Leads extends Component {
  static propTypes ={
    leads: PropTypes.array.isRequired,
    getLeads: PropTypes.func.isRequired,
    deleteLead: PropTypes.func.isRequired,

  }

  componentDidMount() {
    this.props.getLeads();
  }

  render() {

    return (
      <Fragment >
       <div  className="list_size-userForm">
        <h2 className="control_list_title-userForm">Register Leader</h2>
        <Table  className="table col-md-6 table-striped" striped bordered hover variant="dark"  >
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>Image Id</th>
              <th>Created at</th>
              <th />
            </tr>
          </thead>
          <tbody>
          {this.props.leads.map((lead) =>(
            <tr key={lead.id}>
              <td>{lead.id}</td>
              <td>{lead.name}</td>
              <td>{lead.surname}</td>
              <td>{lead.email}</td>
              <td>{lead.image}</td>
              <td>{lead.created_at}</td>
              <td><button onClick={this.props.deleteLead.bind(this, lead.id)} className="btn btn-danger -btn-sm">Delete</button></td>
            </tr>
          ))}
          </tbody>
        </Table>
       </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state =>({
  leads: state.leads.leads,
})

export default connect(mapStateToProps, { getLeads, deleteLead})(Leads);