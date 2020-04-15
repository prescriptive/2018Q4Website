import React from 'react'
import Container from '../components/container'
import Layout from '../components/layout'
import pre404 from '../images/pre_404.png'
import styled from "styled-components"
const Style404= styled.div`
padding:60px 0px;
text-align:center;
p{
  margin:20px 0px 40px 0px;
}
h1{
  margin:0px;
}
  img{
    max-width:600px;
    width:100%;
  }
`
const NotFoundPage = () => (
  <Layout>
    <Container>
      <Style404>
      <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    <img src={pre404} />
    </Style404>
    </Container>
  </Layout>
);
export default NotFoundPage;
