import React from "react"
import Container from "../components/container"
import Layout from "../components/layout"
import pre404 from "../images/pre_404.png"
import styled from "styled-components"
import { ReactTypeformEmbed } from "react-typeform-embed"

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
class NotFoundPage extends React.Component {
  constructor(props) {
    super(props)
    this.openForm = this.openForm.bind(this)
  }

  openForm() {
    this.typeformEmbed.typeform.open()
  }
  render() {
    return (
      <Layout>
        <Container>
          <Style404>
            <h1>Typeform</h1>
            <ReactTypeformEmbed
              popup
              autoOpen={false}
              url="https://alexander733713.typeform.com/to/PqKxrv"
              hideHeaders
              hideFooter
              buttonText="Go!"
              style={{ top: 100, display: "none" }}
              ref={tf => {
                this.typeformEmbed = tf
              }}
            />
            <button
              className="btn"
              onClick={this.openForm}
              style={{ cursor: "pointer" }}
            >
              Click to open the popup!
            </button>
            {/* <div
          className="section-embed"
          dangerouslySetInnerHTML={{
            __html:
              '<div class="typeform-widget" data-url="https://alexander733713.typeform.com/to/PqKxrv" style="width: 100%; height: 500px;"></div> <script> (function() { var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id="typef_orm", b="https://embed.typeform.com/"; if(!gi.call(d,id)) { js=ce.call(d,"script"); js.id=id; js.src=b+"embed.js"; q=gt.call(d,"script")[0]; q.parentNode.insertBefore(js,q) } })() </script> <div style="font-family: Sans-Serif;font-size: 12px;color: #999;opacity: 0.5; padding-top: 5px;"> powered by <a href="https://admin.typeform.com/signup?utm_campaign=PqKxrv&utm_source=typeform.com-01E8WKE8E3CSM0JFX5V5P0E89E-free&utm_medium=typeform&utm_content=typeform-embedded-poweredbytypeform&utm_term=EN" style="color: #999" target="_blank">Typeform</a> </div>',
          }}
        /> */}
          </Style404>
        </Container>
      </Layout>
    )
  }
}
export default NotFoundPage
