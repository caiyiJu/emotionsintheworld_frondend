import axios from 'axios';
import { returnErrors } from './messages';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";

//CHECK THE TOKEN & LOAD USER
export const loadUser =()=> (dispatch, getState)=>{
  //User Loading
  dispatch({type: USER_LOADING});
  const {REACT_APP_URL} = process.env;

  axios.get(`${REACT_APP_URL}/accounts/api/auth/user`, tokenConfig(getState))
    .then(res =>{
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    }).catch(err =>{
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      })
  })


}

//LOGIN USER
export const login =(username, password)=> dispatch=>{
  const {REACT_APP_URL} = process.env;
  //Headers
  const config ={
    headers:{
      'Content-Type': 'application/json'
    }
  }

  //Request Body
  const body = JSON.stringify({username, password})

  axios.post(`${REACT_APP_URL}/accounts/api/auth/login`, body, config)
    .then(res =>{
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    }).catch(err =>{
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({
      type: LOGIN_FAIL
    })
  })
};

//REGISTER USER
export const register =({ first_name, last_name,  username, password, email })=> dispatch=>{
  //Headers
  const config ={
    headers:{
      'Content-Type': 'application/json'
    }
  }
  const {REACT_APP_URL} = process.env;
  //Request Body
  const body = JSON.stringify({first_name, last_name,  username, password, email})

  axios.post(`${REACT_APP_URL}/accounts/api/auth/register`, body, config)
    .then(res =>{
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    }).catch(err =>{
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({
      type: REGISTER_FAIL
    })
  })
};

// LOGOUT USER
//CHECK THE TOKEN & LOAD USER
export const logout =()=> (dispatch, getState)=>{
  const {REACT_APP_URL} = process.env;

  axios.post(`${REACT_APP_URL}/accounts/api/auth/logout/`,null, tokenConfig(getState))
    .then(res =>{
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    }).catch(err =>{
    dispatch(returnErrors(err.response.data, err.response.status));
  })


}

//Setup config with token - helper function
export const tokenConfig = getState =>{
  //Get token from the state
  const token = getState().auth.token;

  //Headers
  const config ={
    headers:{
      'Content-Type': 'application/json'
    }
  }

  //If token, add to headers config
  if(token){
    config.headers['Authorization']= `Token ${token}`;
  }

  return config;
}