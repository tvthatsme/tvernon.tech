import React from 'react'
import PostPreview from '../components/PostPreview'
import Sidebar from '../components/Sidebar'
import { Page, SidebarArea, ContentArea } from '../styles/layout'
import injectGlobalStyles from '../styles/global'
import Social from '../components/Social'

injectGlobalStyles()

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <Page>
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
  }
`
