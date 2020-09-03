import React from "react"
import Container from "../components/container"
import Layout from "../components/layout"
import pre404 from "../images/pre_404.png"
import styled from "styled-components"

const StyleZoomRegister = styled.div`
  padding: 60px 0px;
  text-align: center;
  p {
    margin: 20px 0px 40px 0px;
  }
  h1 {
    margin: 0px;
  }
  img {
    max-width: 600px;
    width: 100%;
  }
`

// var Zoom = require("zoomus")({
//   key : "c920HuB0SCuG86cbSljUYQ",
//   secret : "7x0AHH4ErYgpvRxBPAiMlcrN6Jb1za7ucGX2"
// });

// const oauthClientId = "AitudHVxSLKhEXiVowSrTQ"

// const oauthClientSecret = "yfMM0OOj5Jx8h7wUqOrF5KFU1FvOVj1u"



// function zoom() {
//   	// TEST API credentials
// 	ac.credentials_test().then(function(result) {
// 		// successful request
// 		if (result.success) {
//       // VALID ACCOUNT
//       console.log(result)
// 		} else {
// 			// INVALID ACCOUNT
// 		}
// 	}, function(result) {
// 		// request error
// 	});
// }

class ZoomRegister extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault()
    // zoom()
  }
  
  render() {
    return (
      <Layout>
      <Container>
        <StyleZoomRegister>
          <h1>Register</h1>
          <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
        </StyleZoomRegister>
      </Container>
    </Layout>
    );
  }
}

export default ZoomRegister
