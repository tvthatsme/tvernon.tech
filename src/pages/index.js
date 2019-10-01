import React from 'react'
import Helmet from 'react-helmet'
import PostPreview from '../components/PostPreview'
import Sidebar from '../components/Sidebar'
import { Page, SidebarArea, ContentArea } from '../styles/layout'

import Social from '../components/Social'
import { graphql } from 'gatsby'
import { Global } from '@emotion/core'
import globalStyles from '../styles/global'

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <Page>
      <Helmet>
        <html lang="en" />
        <title>Timothy Vernon | Frontend Developer</title>
        <meta
          name="description"
          content={data.site.siteMetadata.quickDescription}
        />
      </Helmet>
      <Global styles={globalStyles} />
      <SidebarArea>
        <Sidebar />
        <Social />
      </SidebarArea>
      <ContentArea>
        {posts
          .filter(post => post.node.frontmatter.title.length > 0)
          .map(({ node: post }) => (
            <PostPreview post={post} key={post.id} />
          ))}
      </ContentArea>
    </Page>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
    site {
      siteMetadata {
        title
        quickDescription
      }
    }
  }
`
