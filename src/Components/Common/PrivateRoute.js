
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const PrivateRoute = ({ component: Component, auth,  ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
     //GET THE TOKEN FORM THE LOCALSTORAGE IS EMPTY ON THE AUTH
     const tokenLocalStorage = localStorage.getItem('token');
     //console.log("tokenLocalStorage: " + tokenLocalStorage);
     //console.log("Private Route Component: " + auth.isAuthenticated + " props value: " + JSON.stringify(props) + " ...rest " +JSON.stringify(rest) );
      if (auth.isLoading) {
        return <h2>Loading...</h2>;
      } else if (!tokenLocalStorage) {
        return <Redirect to="/login" />;
      } else {
        return <Component {...rest} {...props} />;
      }
    }}
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);