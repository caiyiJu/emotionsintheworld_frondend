import './App.css';
import Classifier from "./Components/Classifier/Classifier";
import ImageList from "./Components/ImageList/ImageList";
import Dashboard from "./Components/LeadUsers/Dashboard";
import Navigation from "./Components/Navigation/Navigation";
import Alerts from "./Components/Alerts/Alerts";
import Login from "./Components/Accounts/Login";
import Register from "./Components/Accounts/Register";
import PrivateRoute from "./Components/Common/PrivateRoute";
import {BrowserRouter, Switch, Route} from 'react-router-dom'

//redux
import {Provider} from "react-redux";
import store from './store'

//User management
import { loadUser } from "./actions/auth";


//react alert
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from "react-alert-template-basic";
import {Component, Fragment} from "react";





//Alert options
const alertOptions ={
  timeout: 3000,
  position: 'top center',
  transition: 'fade',

  containerStyle: {
    zIndex: 5000,
    textTransform: 'lowercase',
  }

}




class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
    // console.log("Store object: " + JSON.stringify(store) );
  }



  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <BrowserRouter>
            <Fragment>
              <Navigation/>
              <Alerts/>
              <div className='App'>
                <Switch>
                  <PrivateRoute exact path='/list' component={ImageList}/>
                  <PrivateRoute exact path='/dropzone' component={Classifier}/>
                  <PrivateRoute exact path='/dashboard' component={Dashboard} />
                  <Route exact path='/login' component={Login}/>
                  <Route exact path='/register' component={Register}/>
                  <Route exact path='*' component={ImageList}/>
                </Switch>
              </div>
            </Fragment>
          </BrowserRouter>
        </AlertProvider>
      </Provider>
    );
  }
}



export default App;
