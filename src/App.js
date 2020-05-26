import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


class App extends Component {

   /* 
   * state object
   */

   state = {

     formData: {

        name: '',
        email: '',
        message: ''

       },


       submitted: false,

   }


  /*
   * async function to call the gateway 
  */
  async asyncFunc() {


  /*
   * define the payload
  */
  const body = "name=" + this.state.formData.name + "&email=" + this.state.formData.email + "&message=" + this.state.formData.message;  


  /*
   * make ajax call
  */

  fetch('https://8sw4wqs63k.execute-api.us-west-2.amazonaws.com/v1/', {
    method: 'post',
    body: JSON.stringify(body)

      }).then(function (response) {

       return response.json();

      }).then(function (data) {

    });

  };


  /* 
   * events
  */
   
  handleChange = (event) => {

    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });

  }


  /*
   * return MaterialUi Based form
  */

  render() {

   //   let formData = this.state.formData;

   //   let submitted = this.state.submitted;
 

        return (
            <ValidatorForm
                ref="form"
            >
                <h2>Simple form</h2>

                <TextValidator
                    label="Name"
                    onChange={this.handleChange}
                    name="name"
                    value={this.state.formData.name}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />

                <br />

                <TextValidator
                    label="Email"
                    onChange={this.handleChange}
                    name="email"
                    value={this.state.formData.email}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                />
                <br />


                <TextValidator
                    label= "Message"
                    onChange={this.handleChange}
                    name= "message"
                    value={this.state.formData.message}
                    validators={['required']}
                    errorMessages={['this field is required']}
                    multiline
                />


                <br />


                <Button
	        	    onClick={() => { this.asyncFunc(); alert('Submitted');  }}
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={this.state.submitted}
                >
                    {
                    }
                </Button>
            </ValidatorForm>
        );
    }


}


export default App;
