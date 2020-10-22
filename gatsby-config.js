require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const linkResolver = require("./src/utils/linkResolver")

module.exports = {
  siteMetadata: {
    title: `Prescriptive Solutions`,
    description: `Prescriptive Data Solutions helps our enterprise customers connect, secure, transform and scale through information technology consulting, solutions, integration, and managed services.`,
    author: `Digett`,
    siteUrl: `https://www.prescriptive.solutions`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://www.prescriptive.solutions",
        sitemap: "https://www.prescriptive.solutions/sitemap.xml",
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
      resolve: `gatsby-source-prismic`,
      options: {
        shouldDownloadImage: ({ node, key, value }) => {
          // Return true to download the image or false to skip.
          return true
        },
        linkResolver: ({ node, key, value }) => doc => {
          // Your link resolver
          if (doc.type === "blog_post") {
            return "/blog/" + doc.uid
          }
          if (doc.type === "pa") {
            return "/" + doc.uid
          }
          // Homepage route fallback
          return "/"
        },
        // PrismJS highlighting for labels and slices
        repositoryName: `prescriptive`,
        accessToken: `${process.env.API_KEY}`,
        schemas: {
          pa: require("./src/schemas/page.json"),
          blog_post: require("./src/schemas/blog_post.json"),
          site_information: require("./src/schemas/site_information.json"),
          leadership: require("./src/schemas/leadership.json"),
          job: require("./src/schemas/job.json"),
          blocks: require("./src/schemas/blocks.json"),
          block: require("./src/schemas/block.json"),
          podcast: require("./src/schemas/podcast.json"),
        },
        prismicToolbar: false,
      },
    },
    // `gatsby-plugin-preact`,
    `gatsby-plugin-webpack-bundle-analyser-v2`,
    {
      resolve: 'gatsby-plugin-preconnect',
      options: {
        domains: ['https://www.google-analytics.com'],
      },
    },
    {
      resolve: "gatsby-source-buzzsprout",
      options: {
        // You will need to generate an access token and get the podcast ID from your account
        // https://github.com/Buzzsprout/buzzsprout-api#authentication
        token: `${process.env.BUZZ_API}`,
        podcastId: "1278785",
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
    // {
    //   resolve: `gatsby-plugin-prefetch-google-fonts`,
    //   options: {
    //     fonts: [
    //       {
    //         family: `Roboto`,
    //         variants: [`400`, `500`, `700`, `900`],
    //       },
    //       {
    //         family: `Libre Franklin`,
    //         variants: [`500`, `800`, `900`],
    //       },
    //     ],
    //   },
    // },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        // Exclude specific pages or groups of pages using glob parameters
        // See: https://github.com/isaacs/minimatch
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
            allPrismicPa {
              nodes {
                uid
              }
            }
            allPrismicBlogPost {
              nodes {
                uid
              }
            }
            allPrismicJob {
              nodes {
                uid
              }
            }
        }`,
        resolveSiteUrl: ({ site, allSitePage }) => {
          //Alternativly, you may also pass in an environment variable (or any location) at the beginning of your `gatsby-config.js`.
          return site.siteMetadata.siteUrl
        },
        serialize: ({
          site,
          allPrismicPa,
          allPrismicBlogPost,
          allPrismicJob,
        }) => {
          let pages = []
          allPrismicPa.nodes.map(edge => {
            pages.push({
              url: `${site.siteMetadata.siteUrl}/${edge.uid}`,
              changefreq: `daily`,
              priority: 0.7,
            })
          })
          allPrismicBlogPost.nodes.map(edge => {
            pages.push({
              url: `${site.siteMetadata.siteUrl}/insights/${edge.uid}`,
              changefreq: `daily`,
              priority: 0.7,
            })
          })
          allPrismicJob.nodes.map(edge => {
            pages.push({
              url: `${site.siteMetadata.siteUrl}/job-opportunity/${edge.uid}`,
              changefreq: `daily`,
              priority: 0.7,
            })
          })
          return pages
        },
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-KWP5GHG",
      },
    },
    `gatsby-plugin-offline`,
    "gatsby-plugin-netlify",
  ],
}
