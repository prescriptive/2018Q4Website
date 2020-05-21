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

        <form
          name="resume2"
          method="post"
          netlify-honeypot="bot-field"
          data-netlify="true"
        >
          <input type="hidden" name="form-name" value="resume2" />
          <p hidden>
            {" "}
            <label htmlFor="bot-field">
              Don’t fill this out: <input name="bot-field" />{" "}
            </label>{" "}
          </p>
          <div class="form-group">
            <label for="name" class="lb-name">
              First Name *
            </label>
            <input
              type="text"
              name="name"
              id="name"
              class="form-control"
              data-required="true"
              data-interactive="true"
            />
          </div>
          <div class="form-group">
            <label for="surname" class="lb-surname">
              Last Name *
            </label>
            <input
              type="text"
              name="surname"
              id="surname"
              class="form-control"
              data-required="true"
              data-interactive="true"
            />
          </div>
          <div class="form-group">
            <label for="email" class="lb-email">
              Email *
            </label>
            <input
              type="email"
              name="email"
              id="email"
              class="form-control"
              data-required="true"
              data-interactive="true"
            />
          </div>
          <div class="form-group">
            <label for="phone" class="lb-phone">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              class="form-control"
              data-required="false"
              data-interactive="true"
            />
          </div>
          <div class="form-group text">
            <label for="textarea" class="lb-message">
              Message*
            </label>
            <textarea
              name="textarea"
              id="textarea"
              class="textarea form-control"
              data-required="true"
              data-trim="true"
            />
          </div>
          <p>
            <label>
              Message: <input type="file" name="resume"></input>
            </label>
          </p>
          <div>
            <button type="submit" class="btn btn-submit">
              Send Message
            </button>
          </div>
        </form>
      </Style404>
    </Container>
  </Layout>
)
export default NotFoundPage
