module.exports = {
  siteMetadata: {
    title: 'Timothy Vernon - Tech',
    siteUrl: 'https://tvernon.tech',
    quickDescription:
      'I build beautiful, modern web applications with Javascript. This is my website where I write about what I am learning and my experiences.',
  },
  plugins: [
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-emotion`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/posts`,
        name: 'posts',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-126636071-1',
      },
    },
  ],
}
