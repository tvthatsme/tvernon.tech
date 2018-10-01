import React from 'react'
import Helmet from 'react-helmet'
import PostPreview from '../components/PostPreview'
import Sidebar from '../components/Sidebar'
import { Page, SidebarArea, ContentArea } from '../styles/layout'
import injectGlobalStyles from '../styles/global'

injectGlobalStyles()

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <Page>
      <Helmet>
        <meta
          name="description"
          content="Timothy Vernon Tech Blog and Website"
        />
      </Helmet>
      <SidebarArea>
        <Sidebar />
      </SidebarArea>
      <ContentArea>
        {posts
          .filter(post => post.node.frontmatter.title.length > 0)
          .map(({ node: post }) => <PostPreview post={post} key={post.id} />)}
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
