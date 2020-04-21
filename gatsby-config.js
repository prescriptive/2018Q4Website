require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const prismicHtmlSerializer = require("./src/gatsby/htmlSerializer")
// const linkResolver = require("./src/utils/linkResolver")

module.exports = {
  siteMetadata: {
    title: `Prescriptive Solutions`,
    description: `Prescriptive Data Solutions helps our enterprise customers connect, secure, transform and scale through information technology consulting, solutions, integration, and managed services.`,
    author: `Digett`,
    siteUrl: `https://prescriptive.solutions`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        // Exclude specific pages or groups of pages using glob parameters
        // See: https://github.com/isaacs/minimatch
        // The example below will exclude the single `path/to/page` and all routes beginning with `category`
        exclude: [`/category/*`, `/path/to/page`],
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
            allPrismicPa(filter: {data: {do_not_index: {eq: false}}}) {
              edges {
                node {
                  uid
                }
              }
            }
            allPrismicBlogPost{
              edges {
                node {
                  uid
                }
              }
            }
        }`,

        resolveSiteUrl: ({site, allSitePage}) => {
          //Alternativly, you may also pass in an environment variable (or any location) at the beginning of your `gatsby-config.js`.
          return site.siteMetadata.siteUrl
        },
        serialize: ({ site, allPrismicPa }) =>
        allPrismicPa.edges.map(edge => {
            return {
              url: `${site.siteMetadata.siteUrl}/${edge.node.uid}`,
              changefreq: `daily`,
              priority: 0.7,
            }
          }),
          serialize: ({ site, allPrismicBlogPost }) =>
          allPrismicBlogPost.edges.map(edge => {
              return {
                url: `${site.siteMetadata.siteUrl}/blog/${edge.node.uid}`,
                changefreq: `daily`,
                priority: 0.7,
              }
            })
      }
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
        linkResolver: () => post => `/${post.uid}`,
        // PrismJS highlighting for labels and slices
        htmlSerializer: () => prismicHtmlSerializer,
        repositoryName: `prescriptive`,
        accessToken: `${process.env.API_KEY}`,
        schemas: {
          pa: require("./src/schemas/page.json"),
          blog_post: require("./src/schemas/blog_post.json"),
          main_navigation: require("./src/schemas/main_navigation.json"),
          leadership: require("./src/schemas/leadership.json"),
          job: require("./src/schemas/job.json"),
          block: require("./src/schemas/block.json"),
        },
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
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Roboto`,
            varients: [`400`, `500`, `700`, `900`],
          },
          {
            family: `Libre Franklin`,
            variants: [`800`, `900`],
          },
        ],
      },
    },
    `gatsby-v2-plugin-page-transitions`,
    `gatsby-plugin-offline`,
    "gatsby-plugin-netlify",
  ],
}
