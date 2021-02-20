import React, {Component} from 'react';
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import axios from 'axios';
import Suggestions from "./Suggestions";

/************************ Import Logo and Icons ***********************/
import Logo from './logo_only.png'
import { FaSearch, FaBars } from 'react-icons/fa';
import {IoMdClose} from 'react-icons/io';
import {FiLogOut} from 'react-icons/fi'

/************************ Import CSS ***********************/
import '../../Tooltip.css'
import './Navigation.css';
import './SearchResults.css';
/************************ END ***********************/

export class Navigation extends Component{

  static propTypes ={
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  }

  state = {
    query: '',
    results: []
  }
  /************************* Search Function ********************************/
  //Get the input values from the search box
  handleInputChange = () => {
    this.setState({
      query: this.search.value

    }, () => {
      let modal = document.getElementById("myModal");
      modal.style.display = "block";
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          console.log("Search Query: " + this.state.query)
          let query_value =  this.state.query;

          //Call the function getInfo to make the request
          this.getInfo(query_value)
          // Get the <span> element that closes the modal
          // var span = document.getElementsByClassName("close")[0];
          // // When the user clicks on <span> (x), close the modal
          // span.onclick = function() {
          //   modal.style.display = "none";
          // }
        }
      }else{
        modal.style.display = "none";
        if(this.state.query.length=== 0){
          console.log("Length === 0")
          this.setState({
            query: ""
          });
          this.getInfo(this.state.query)
        }
      }
    })
  }
 //Get the click values of the sugestions
  onClick = (e) => {
    if(e){
      let modal = document.getElementById("myModal");
      modal.style.display = "none";
      e.preventDefault();
      this.setState({
        query: e.target.innerText
      },function () {
        this.getInfo(this.state.query)
        console.log();
        console.log("Query Value--->"+this.state.query);
      });
    }
    console.log("Clicked on the list ")
  };


  getInfo = (query_value) => {
    const {REACT_APP_URL} =process.env;
    const tokenLocalStorage = localStorage.getItem('token');
    axios.get(`${REACT_APP_URL}/api/SearchPost?q=${query_value}`,{
      headers:{
        'accept': 'application/json',
        'Authorization': `Token ${tokenLocalStorage}`
        }
      })
      .then(data => {
        this.setState({
          results: data["data"]
        })
       //console.log((this.state.results[0].classField))
      })
  }


  /*************************** END *****************************************/




render(){
  /*************************** Navigation functions *****************************************/
  function menuBtn(){
    const menuBtn = document.querySelector(".menu-icon")
    const searchBtn = document.querySelector(".search-icon ")
    const cancelBtn = document.querySelector(".cancel-icon")
    const items =  document.querySelector(".nav-items")


    console.log("1 --> CLICK MENU BUTTON")
    items.classList.add("active");
    menuBtn.classList.add("hide");
    searchBtn.classList.add("hide");
    cancelBtn.classList.add("show");
  }

  function cancelBtn(){
    const menuBtn = document.querySelector(".menu-icon")
    const searchBtn = document.querySelector(".search-icon ")
    const cancelBtn = document.querySelector(".cancel-icon")
    const items =  document.querySelector(".nav-items")
    const form = document.querySelector("form")


    console.log("2 --> CLICK CANCEL BUTTON")
    items.classList.remove("active");
    menuBtn.classList.remove("hide");
    searchBtn.classList.remove("hide");
    cancelBtn.classList.remove("show");
    form.classList.remove("active");
    cancelBtn.style.color="#ff3d00"
  }

  function searchBtn(){
    console.log("3 --> CLICK SEARCH BUTTON")
    const form = document.querySelector("form")
    const searchBtn = document.querySelector(".search-icon ")
    const cancelBtn = document.querySelector(".cancel-icon")

    form.classList.add("active");
    searchBtn.classList.add("hide");
    cancelBtn.classList.add("show");

  }
  /*************************** END *****************************************/

  /*************************User Functions ********************************/
  const { isAuthenticated, user} = this.props.auth;

  const authLinks =(
    <div className="nav-items logout_button"  >
      <span className="navbar-text mr-3 text-light">
        <strong>
          {user ? `Login as: ${user.username}` : ""}
        </strong>
      </span>
      <li>
        <ReactTooltip className='extraClass' delayHide={100} effect='solid'/>
        <FiLogOut onClick={this.props.logout} data-tip='Logout' size={30} color={'white'} />
      </li>
      {/*<li>*/}
      {/*  {user ? `Welcome ${user.username}` : ""}*/}
      {/*</li>*/}
    </div>
  );
  const guestLinks =(
    <div className="nav-items">
      <li><a href="/register"> Register</a></li>
      <li><a href="/login"> Login</a></li>
    </div>
  );
  /*************************** END *****************************************/



  return (

        <nav>
            <div className="menu-icon">
                <FaBars  onClick={menuBtn} size={20} color={'white'}/>
            </div>
            <div  className="logo" >
              <img src={Logo} style={{width:80, marginTop: 2}} />
            </div>
            <div className="nav-items">
              <li><a href="/list">Home</a></li>
              <li><a href="/dropzone">Dropzone</a></li>
              <li><a href="/dashboard"> Leads</a></li>
            </div>
            <div className="search-icon">
              <FaSearch onClick={searchBtn} size={20} color={'white'}/>
            </div>
            <div className="cancel-icon">
              <IoMdClose onClick={cancelBtn} size={20} color={'red'}/>
            </div>
            <form action="#" className="wrap">
              <input type="search"  placeholder="Search" className="search-data" required="required" value={this.state.query} ref={input => this.search = input} onChange={this.handleInputChange} />
              <div id="myModal" className="modal createGroup" >
                <div className="modal-content" onClick={this.onClick}>
                  {/*<span className="close">&times;</span>*/}
                  <Suggestions results={this.state.results}  />
                </div>
              </div>
              {/*<button type="submit" className="icon" >*/}
                <FaSearch size={30} color={'white'} style={{height:'50px',
                  width: '23px', margin:'0px 10px',  padding:"4px 0px 20px 0px", cursor: "pointer"}}/>
              {/*</button>*/}
            </form>
          { isAuthenticated ? authLinks : guestLinks}
        </nav>
    );
  }
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navigation);
