import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as variable from "../components/variables"
import styled from "styled-components"
import Container from "../components/container"
import SEO from "../components/seo"
import Img from "gatsby-image"
import { RichText } from "prismic-reactjs"

const JobStyle = styled.div`
  section {
    padding: ${variable.sectionPadding};
  }
`
const Job = ({ data }) => {
  const job = data.job.allJobs.edges[0].node
  const site = data.site.allSite_informations.edges[0].node
  console.log(site)
  return (
    <Layout>
      <SEO site={site} page={job} />
      <JobStyle>
        <Container>
          <h1>{job.title[0].text}</h1>
          <div className="job-location">{job.location[0].text}</div>
          <div className="job-description">
            {RichText.render(job.description)}
          </div>
        </Container>
      </JobStyle>
    </Layout>
  )
}
export default Job
export const jobQuery = graphql`
  query JobBySlug {
    job: prismic {
      allJobs {
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
    site: prismic {
      allSite_informations {
        edges {
          node {
            description
            site_url
            site_title
            twitter_author
          }
        }
      }
    }
  }
`
