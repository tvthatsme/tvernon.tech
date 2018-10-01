import React from 'react'
import RecentPosts from '../components/RecentPosts'
import { Page, SidebarArea, ContentArea } from '../styles/layout'
import Sidebar from '../components/Sidebar'
import { Blog } from '../styles/blog'
import { css } from 'emotion'
import { h1 } from '../styles/elements'
import Helmet from 'react-helmet'

export default function Template({ data }) {
  const { markdownRemark, allMarkdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <div>
      <Helmet
        title={frontmatter.title}
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      />
      <Page>
        {/* Content goes first for seo */}
        <ContentArea>
          <Blog>
            <h1
              className={css`
                ${h1};
              `}
            >
              {frontmatter.title}
            </h1>
            <date>{frontmatter.date}</date>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </Blog>
        </ContentArea>
        {/* Navigation and other links go second */}
        <SidebarArea>
          <Sidebar isPrimary={false} />
          {/* <RecentPosts posts={allMarkdownRemark} /> */}
        </SidebarArea>
      </Page>
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
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
