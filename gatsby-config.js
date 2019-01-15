module.exports = {
  siteMetadata: {
    title: 'Prescriptive',
    siteUrl: `https://pre-gatsby-staging--prescriptive-solutions-2018q4website.netlify.com`,
  },
  plugins: [
    {
    resolve: `gatsby-plugin-favicon`,
    options: {
      logo: "./src/favicon.png",
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    },
  },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [],
      },
    },
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-sitemap`,
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
