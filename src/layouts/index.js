import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

// require styles for code syntax highlighting
require('prismjs/themes/prism-okaidia.css')

const Layout = ({ children, data }) => (
  <div>
    <Helmet>
      <html lang="en" />
      <title>Timothy Vernon | Frontend Developer</title>
      <meta
        name="description"
        content={data.site.siteMetadata.quickDescription}
      />
    </Helmet>
    <div>{children()}</div>
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        quickDescription
      }
    }
  }
`
