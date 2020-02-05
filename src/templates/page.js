// import React from "react"
// import { graphql } from "gatsby"
// import Layout from "../components/layout"
// import BasicSection from "../components/slices/BasicSection"
// import ColumnsSection from "../components/slices/ColumnsSection"
// import * as variable from "../components/variables"
// import styled from "styled-components"
// import Container from "../components/container"
// import "../components/nodes/home.scss"
// import { Link, RichText, Date } from "prismic-reactjs"
// import htmlSerializer from "../utils/htmlSerializer"
// import { linkResolver } from "../utils/linkResolver"

// const PageStyle = styled.div`
//   section {
//     padding: ${variable.sectionPadding};
//   }
// `
// const Page = ({ data: { prismicPa } }) => {
//   const { data } = prismicPa

//   return (
//     <Layout>
//       <PageStyle>
//         <Container>
//           <h1>{data.title.text}</h1>
//         </Container>
//         {data.body.map((slice, index) => (
//           <div>
//             {slice.slice_type === "basic_section" &&
//               // console.log(slice.primary.content.raw)
//               RichText.render(
//                 slice.primary.content,
//                 linkResolver,
//                 htmlSerializer
//               )

//             // <BasicSection slice={slice}></BasicSection>
//             }
//             {slice.slice_type === "columns_section" && (
//               <ColumnsSection slice={slice}></ColumnsSection>
//             )}
//           </div>
//         ))}
//       </PageStyle>
//     </Layout>
//   )
// }
// export default Page
// export const pageQuery = graphql`
//   query PageBySlug($uid: String!) {
//     prismicPa(uid: { eq: $uid }) {
//       uid
//       data {
//         title {
//           text
//         }
//         body {
//           ... on PrismicPaBodyColumnsSection {
//             id
//             prismicId
//             slice_type
//             primary {
//               background_color
//               column_count
//             }
//             items {
//               content {
//                 text
//                 url
//               }
//             }
//           }
//           ... on PrismicPaBodyBasicSection {
//             id
//             prismicId
//             slice_type
//             primary {
//               background_image {
//                 localFile {
//                   childImageSharp {
//                     fluid {
//                       srcSet
//                     }
//                   }
//                 }
//               }
//               content {
//                 raw {
//                   text
//                   type
//                 }
//                 text
//                 html
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `
