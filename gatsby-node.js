/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// const path = require("path")
// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions
//   const pages = await graphql(`
//     {
//       blog: allPrismicBlogPost {
//         nodes {
//           uid
//         }
//       }
//       page: allPrismicPa {
//         nodes {
//           uid
//         }
//       }
//     }
//   `)
//   const postTemplate = path.resolve("src/templates/post.js")
//   pages.data.blog.nodes.forEach(node => {
//     createPage({
//       path: `/blog/${node.uid}`,
//       component: postTemplate,
//       context: {
//         uid: node.uid,
//       },
//     })
//   })
//   const pageTemplate = path.resolve("src/templates/page.js")
//   pages.data.page.nodes.forEach(node => {
//     if (node.uid == "home") {
//       createPage({
//         path: `/`,
//         component: pageTemplate,
//         context: {
//           uid: node.uid,
//         },
//       })
//     } else {
//       createPage({
//         path: `/${node.uid}`,
//         component: pageTemplate,
//         context: {
//           uid: node.uid,
//         },
//       })
//     }
//   })
// }
