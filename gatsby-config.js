require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
// const linkResolver = require("./src/utils/linkResolver")

module.exports = {
  siteMetadata: {
    title: `Prescriptive Solutions`,
    description: `Prescriptive Data Solutions helps our enterprise customers connect, secure, transform and scale through information technology consulting, solutions, integration, and managed services.`,
    author: `Digett`,
    siteUrl: `https://source--prescriptive-solutions-2018q4website.netlify.app`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host:
          "https://source--prescriptive-solutions-2018q4website.netlify.app",
        sitemap:
          "https://source--prescriptive-solutions-2018q4website.netlify.app/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-prismic-graphql",
      options: {
        repositoryName: "prescriptive", // required
        defaultLang: "en-us", // optional, but recommended
        previews: true, // optional, default: false
        path: "preview",
        pages: [
          {
            type: "Pa", // TypeName from prismic
            match: "/:uid", // pages will be generated under this pattern
            filter: data => data.node._meta.uid !== "home",
            component: require.resolve("./src/templates/page.js"),
            langs: ["en-us"],
            sharpKeys: [
              /image|main_image|logo|photo|picture/, // (default)
            ],
          },
          {
            type: "Pa", // TypeName from prismic
            match: "/", // pages will be generated under this pattern
            filter: data => data.node._meta.uid == "home",
            component: require.resolve("./src/templates/page.js"),
            langs: ["en-us"],
            sharpKeys: [
              /image|main_image|logo|photo|picture/, // (default)
            ],
          },
          {
            type: "Job", // TypeName from prismic
            match: "/job-opportunity/:uid", // pages will be generated under this pattern
            component: require.resolve("./src/templates/job.js"),
            path: "job-preview",
            langs: ["en-us"],
            sharpKeys: [
              /image|main_image|logo|photo|picture/, // (default)
            ],
          },
          {
            type: "Blog_post", // TypeName from prismic
            match: "/insights/:uid", // pages will be generated under this pattern
            component: require.resolve("./src/templates/post.js"),
            path: "blog-preview",
            langs: ["en-us"],
            sharpKeys: [
              /image|main_image|logo|photo|picture/, // (default)
            ],
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
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
    // {
    //   resolve: `gatsby-plugin-google-tagmanager`,
    //   options: {
    //     id: "GTM-KWP5GHG",

    //     // Include GTM in development.
    //     // Defaults to false meaning GTM will only be loaded in production.
    //     includeInDevelopment: true,

    //     // Specify optional GTM environment details.
    //     // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_AUTH_STRING",
    //     // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_PREVIEW_NAME",
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Roboto`,
            variants: [`400`, `500`, `700`, `900`],
          },
          {
            family: `Libre Franklin`,
            variants: [`800`, `900`],
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    "gatsby-plugin-netlify",
  ],
}
