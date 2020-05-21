import React from "react"
import Container from "../components/container"
import Layout from "../components/layout"
import pre404 from "../images/pre_404.png"
import styled from "styled-components"
const Style404 = styled.div`
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
const NotFoundPage = () => (
  <Layout>
    <Container>
      <Style404>
        <h1>Netlify Form</h1>
        <form name="contact" method="POST" data-netlify="true">
          <p>
            <label>
              Your Name: <input type="text" name="name" />
            </label>
          </p>
          <p>
            <label>
              Your Email: <input type="email" name="email" />
            </label>
          </p>
          <p>
            <label>
              Your Role:{" "}
              <select name="role[]" multiple>
                <option value="leader">Leader</option>
                <option value="follower">Follower</option>
              </select>
            </label>
          </p>
          <p>
            <label>
              Message: <textarea name="message"></textarea>
            </label>
          </p>
          <p>
            <label>
              Message: <input type="file" name="resume"></input>
            </label>
          </p>
          <p>
            <button type="submit">Send</button>
          </p>
        </form>
      </Style404>
    </Container>
  </Layout>
)
export default NotFoundPage
