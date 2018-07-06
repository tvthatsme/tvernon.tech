module.exports = {
  siteMetadata: {
    title: 'Timothy Vernon - Tech',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/posts`,
        name: 'posts',
      },
    },
    {
      resolve: 'gatsby-plugin-emotion',
      options: {},
    },
    'gatsby-transformer-remark',
  ],
}