
/*Nikolaos Christou, 08/11/2020
* This is the classifier class.
* In this class I have set up the Dropzone functionality.
* I am using the react-dropzone API
*`https://react-dropzone.js.org/#section-components
* */
import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import './Classifier.css'
import  {Image, Alert, Button, Spinner} from "react-bootstrap";
import axios from 'axios';





class Classifier extends Component {
  state = {
      files:[],
      //Control the visibility of the spinner
      isLoading: false,
      recentImage: null

  }



  //Set the state.
  onDrop =(files)=>{
    this.setState({
      //When I set the state I am updating the spinner
      files:[],
      isLoading: true,
      recentImage: null,
    })
    this.loadImage(files)
  }
  /*The loading function is start the timer to hide the spinner*/
  loadImage=(files)=>{
      setTimeout(()=>{
        this.setState({
          files,
          isLoading: false
        },() =>{
          console.log(this.state.files)
          console.log(this.state.files[0].name)
        })
    }, 1000);

  }

  activateSpinner =()=>{
    this.setState({
       files:[],
       isLoading:true})

  }

  deactivateSpinner =()=>{
    this.setState({isLoading:false})
  }

  //Sent image to the backend
  sendImage =(getState)=>{
    const {REACT_APP_URL} =process.env;
    this.activateSpinner()
    let formData = new FormData()
    formData.append("picture", this.state.files[0], this.state.files[0].name,)
    const tokenLocalStorage = localStorage.getItem('token');
    axios.post(`${REACT_APP_URL}/api/images/`, formData, {
      headers:{
        'Authorization': `Token ${tokenLocalStorage}`,
        'accept': 'application/json',
        'content-type':'multipart/form-data',

      }
    })
      .then(resp=>{
        console.log(resp)
        console.log("ID of the image: " + resp.data.id)
        this.getImageClass(resp)
      })
      .catch(err=>{
        console.log("Error form sent image function: ", err)
      })
  }

  getImageClass =(obj)=>{
    const {REACT_APP_URL} =process.env;
    const tokenLocalStorage = localStorage.getItem('token');
    axios.get(`${REACT_APP_URL}/api/images/${obj.data.id}/`,{
      headers:{
          'accept': 'application/json',
          'Authorization': `Token ${tokenLocalStorage}`
      }
    } )
      .then(resp=>{
        console.log("Response from the get request: ", resp)
        this.setState({recentImage:resp})
      })
      .catch(err=>{
        console.log("Error form sent image function: ", err)
      })

    this.deactivateSpinner()



  }


  render() {

    /*Loop throughout all the files using map function in order to create a list*/
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));
    return (

    /*
    * onDrop I call the files.
    * isDragActive = Is used to change the default text when teh user drop a file to the Dropzone.
    * Use the getRootProps() fn to get the props required for drag 'n' drop and use them on any element.
    * For click and keydown behavior, use the getInputProps() fn and use the returned props on an <input>.
    * accept='image/png, image/jpg' +? Adding this on the Dropzone tag we add restriction to the type of images.
    * */
      <Dropzone onDrop={this.onDrop} >
        {({isDragActive, getRootProps, getInputProps}) => (
          <section className="container">
            <div {...getRootProps({className: 'dropzone back'})}>
              <input {...getInputProps()} />
              <i className="far fa-image mb-2 text-muted" style={{fontSize:100}}></i>
              <p className='text-muted'>{ isDragActive ?"Drop some images " : "Drag '/n' drop some files here, or click to select files"} </p>
            </div>
            <aside>
              {files}
            </aside>
            {/*Show the button only if exist a file*/}
            {this.state.files.length > 0 &&
            <Button variant='info' size='lg' className='my-3' onClick={this.sendImage}>Select Image</Button>
            }
            {/* The Spinner below is used to show the loading state of the image.
            * If the Loading is == true show the spinner.
            */}

            {this.state.isLoading &&
              <Spinner animation="border" role="status"></Spinner>
            }
            {this.state.recentImage &&
              <React.Fragment>
                 <Alert variant='primary'>{this.state.recentImage.data.classField}</Alert>
                 <Image className='justify-content-center' src={this.state.recentImage.data.picture} height='200' rounded/>

              </React.Fragment>
              }
          </section>
        )}
      </Dropzone>
    );
  }
}

export default Classifier;