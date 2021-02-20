import React, {Component} from 'react';
import axios from 'axios'
import Image from "./Image";
import {Button, CardColumns, Spinner} from "react-bootstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";




class ImageList extends Component {
  state ={

    images:[],
    testArray:[],
    //Set something big because I do not want the load button
    visible: 300,
    isLoadingTheList: true,
    isLoadingMoreImages: false,
    status: false,


  }
  static propTypes ={
    searchResults: PropTypes.object
  }


  /*life cycle method
  *componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
  *Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
  */
  componentDidMount() {
   //Get the token from localStorage
   const tokenLocalStorage = localStorage.getItem('token');
   setTimeout(this.getImages(tokenLocalStorage), 500);
  }


  getImages =(tokenLocalStorage)=>{
    const {REACT_APP_URL} = process.env;
    axios
      .get(`${REACT_APP_URL}/api/images/`, {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Token ${tokenLocalStorage}`
        }
      })
      .then(resp=>{
        this.setState({
          images: resp.data,
          status: true
        })
      console.log((resp))

    })
    this.setState({isLoadingTheList: false})
  }
  handleVisible=()=>{
    const visible = this.state.visible
    const new_visible = visible + 2
    this.setState({isLoadingMoreImages:true})
    setTimeout(()=>{
      this.setState({
        visible:new_visible,
        isLoadingMoreImages: false
      })
    },300);

  }


  render() {
    console.log("SEARCH RESULTS " +JSON.stringify(this.props.searchResults) + " this.state.images "  +JSON.stringify(this.state.images) );
    console.log("/**********************************************************/")
    //Convert the object into an array
    let data =  Object.values(this.props.searchResults);
    let searchData = []
    for(let i=0; i<data.length; i++){
      for(let y=0;y < data[i].length; y++){
        console.log(data[i][y].classField)
        searchData.push({
          id: i,
          classField: data[i][y].classField
        });
      }
    }

    console.log("/**********************************************************/")
    console.log("New Array - searchData: " + JSON.stringify(searchData));
    console.log("/**********************************************************/")
    console.log("Images From the call: " + JSON.stringify(this.state.images))
    console.log("/**********************************************************/")

    // let filterValues = this.state.images.filter(cl => cl.classField.includes(searchData.forEach(sh=> sh.classField)) );
    let filterValues = [];
    if(searchData.length > 0){
      for (let n =0; n < this.state.images.length;n++){
        for(let k=0; k < searchData.length; k++){
          if(this.state.images[n].classField.includes(searchData[k].classField)){
            filterValues.push({
              id: n,
              picture: this.state.images[n].picture,
              classField: this.state.images[n].classField,
              uploaded: this.state.images[n].uploaded,
              imageOwner: this.state.images[n].imageOwner
            })
          }
        }
      }
    }else{
      filterValues = this.state.images;
    }

    console.log("filterValues: " + JSON.stringify(filterValues.length) );


    // We control the visibility of the list with the visible state that is in the Image component.
    const images = filterValues.slice(0, this.state.visible).map(img=>{
      // The image is coming from the Image.js classification={}
        return <Image key={img.id} imageId={img.id} pic={img.picture} classification={img.classField}  />
    })
    return (
      <CardColumns style={{ width: '70rem' }}>
        {/*<h1>Explore your emotions</h1>*/}
        {this.state.isLoadingTheList ?
          <Spinner animation="border" role="status"/>
          :
            <React.Fragment>
              {((this.state.images.length ===0 && this.state.status)) &&
                  <h3>No images classified</h3>
              }
              {images}
              {this.state.isLoadingMoreImages &&
                  <Spinner animation="border" role="status"/>}
              <br className="mx-auto mb-2"/>
              {((this.state.images.length > this.state.visible) && (this.state.images.length > 2)) &&
              <Button variant='primary' size='lg' className="mx-auto mb-5" onClick={this.handleVisible}>Load
                More</Button>
              }
              {((this.state.images.length <= this.state.visible) && (this.state.images.length > 0)) &&
                 <h3 className="mb-5" >No more images</h3>
              }

            </React.Fragment>
          }
      </CardColumns>
    );
  }
}


const mapStateToProps = state => ({
  searchResults: state.filter.filters
})

export default connect(mapStateToProps)(ImageList);

