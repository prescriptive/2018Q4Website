require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
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
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: `prescriptive`,
        accessToken: `${process.env.API_KEY}`,
        schemas: {
          pa: require("./src/schemas/page.json"),
          blog_post: require("./src/schemas/blog_post.json"),
          main_navigation: require("./src/schemas/main_navigation.json"),
          leadership: require("./src/schemas/leadership.json"),
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-sass",
      options: {
        data: '@import "variables.scss"; @import "mixins.scss";',
        includePaths: ["src/components/scss"],
      },
    },
    `gatsby-plugin-netlify-headers`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Prescriptive`,
        short_name: `Prescriptive`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/images/favicon.png",

        // WebApp Manifest Configuration
        appName: null, // Inferred with your package.json
        appDescription: null,
        developerName: null,
        developerURL: null,
        dir: "auto",
        lang: "en-US",
        background: "#fff",
        theme_color: "#fff",
        display: "standalone",
        orientation: "any",
        version: "1.0",

        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          yandex: false,
          windows: false,
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: "GTM-KWP5GHG",

        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: true,

        // Specify optional GTM environment details.
        // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_AUTH_STRING",
        // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_PREVIEW_NAME",
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Roboto:400,500,700,900", "Libre Franklin:800,900"],
        },
      },
    },
    `gatsby-v2-plugin-page-transitions`,
    `gatsby-plugin-offline`,
    "gatsby-plugin-netlify",
  ],
}
