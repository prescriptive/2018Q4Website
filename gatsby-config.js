require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const { apiEndpoint } = require("./prismic-config")
var repo = /([^\/]+)\.prismic\.io\/graphql/.exec(apiEndpoint)
module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    // {
    //   resolve: `gatsby-source-prismic`,
    //   options: {
    //     repositoryName: `prescriptive`,
    //     accessToken: `${process.env.API_KEY}`,
    //     linkResolver: ({ node, key, value }) => post => `/${post.uid}`,
    //   },
    // },
    {
      resolve: `gatsby-source-prismic-graphql`,
      options: {
        repositoryName: repo[1], // Loads the repo name from prismic configuration
        path: "/preview",
        previews: true,
        //accessToken: '...',
        pages: [
          // {
          //   type: "pa",
          //   match: "/:uid",
          //   path: "/page",
          //   component: require.resolve("./src/templates/page.js"),
          // },
          {
            type: "Blog_post",
            match: "/blog/:uid",
            path: "/blogpost", // Important that this is different from other generated pages, so not '/blog'
            component: require.resolve("./src/templates/post.js"),
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
