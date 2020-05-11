import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as variable from "../components/variables"
import styled from "styled-components"
import Container from "../components/container"
import SEO from "../components/seo"
import Img from "gatsby-image"
import { RichText } from "prismic-reactjs"
import { linkResolver } from "../utils/linkResolver"

const JobStyle = styled.div`
  section {
    padding: ${variable.sectionPadding};
  }
`
const Job = props => {
  const prismicContent = props.data.prismic.allJobs.edges[0]
  if (!prismicContent) return null
  const job = props.data.prismic.allJobs.edges[0].node
  // const site = props.data.prismic.allSite_informations.edges[0].node
  return (
    <Layout>
      {/* <SEO site={site} page={job} /> */}
      <JobStyle>
        <Container>
          <RichText render={job.title} linkResolver={linkResolver} />
          <div className="job-location">
            <RichText render={job.location} linkResolver={linkResolver} />
          </div>
          <div className="job-description">
            <RichText render={job.description} linkResolver={linkResolver} />
          </div>
        </Container>
      </JobStyle>
    </Layout>
  )
}
export default Job
export const query = graphql`
  query JobByUid($uid: String!) {
    prismic {
      allJobs(uid: $uid) {
        edges {
          node {
            _meta {
              uid
            }
            description
            location
            teaser_description
            title
          }
        }
      }
    }
  }
`
