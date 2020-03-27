import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as variable from "../components/variables"
import styled from "styled-components"
import Container from "../components/container"
import SEO from "../components/seo"
import { Link, RichText, Date } from "prismic-reactjs"
import Img from "gatsby-image"

const JobStyle = styled.div`
  section {
    padding: ${variable.sectionPadding};
  }
`
const Job = ({ data }) => {
  const { job } = data
  const { site } = data

  return (
    <Layout>
      <SEO site={site} page={job} />
      <JobStyle>
        <Container>
          <h1>{job.data.title.text}</h1>
          <div className="job-location">{job.data.location.text}</div>
          <div
            className="job-description"
            dangerouslySetInnerHTML={{
              __html: job.data.description.html,
            }}
          />
        </Container>
      </JobStyle>
    </Layout>
  )
}
export default Job
export const jobQuery = graphql`
  query JobBySlug($uid: String!) {
    job: prismicJob(uid: { eq: $uid }) {
      uid
      data {
        title {
          text
        }
        teaser_description {
          html
        }
        location {
          text
        }
        description {
          html
        }
      }
    }
    site: allPrismicSiteInformation {
      nodes {
        data {
          description {
            text
          }
          site_url {
            text
          }
          site_title {
            text
          }
          twitter_author {
            text
          }
        }
      }
    }
  }
`
