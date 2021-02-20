import React, {Component, Fragment} from 'react';
import { withAlert } from "react-alert";
import {connect} from 'react-redux';
import PropTypes from 'prop-types'

class Alerts extends Component {
  static propTypes ={
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  }

  componentDidUpdate(prevProps) {
    console.log("this.props" + this.props);
    const {error, alert, message} = this.props;
    if(error !== prevProps.error){
      if(error.msg.email) alert.error(`${error.msg.email.join()}`);
      if(error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());
      if(error.msg.username) alert.error(error.msg.username.join());
    }
    if(message !== prevProps.message){
      if(message.deleteUser) alert.success(message.deleteUser);
      if(message.addUser) alert.success(message.addUser);
      if(message.passwordNotMatch) alert.error(message.passwordNotMatch);
      if(message.usernameTooBig) alert.error(message.usernameTooBig);
    }

  }

  render() {
    return <Fragment/>
  }
}


const mapStateToProps = state =>({
  error: state.errors,
  message: state.messages
})


export default connect(mapStateToProps)(withAlert()(Alerts));
