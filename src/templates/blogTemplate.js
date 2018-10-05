import React from 'react'
import RecentPosts from '../components/RecentPosts'
import { Page, SidebarArea, ContentArea } from '../styles/layout'
import Sidebar from '../components/Sidebar'
import { Blog } from '../styles/blog'
import { css } from 'emotion'
import { h1 } from '../styles/elements'
import Helmet from 'react-helmet'
import FacebookLogo from '../assets/Facebook.svg'
import LinkedInLogo from '../assets/LinkedIn.svg'
import TwitterLogo from '../assets/Twitter.svg'
import styled from 'react-emotion'
import Social from '../components/Social'

const ShareSection = styled('div')`
  display: flex;
  flex-direction: row;
  padding-top: 40px;
`

const ShareButtons = styled('ul')`
  list-style: none;
  margin: 16px 0 0 0;

  li,
  a {
    display: inline-block;
    margin-left: 5px;
  }

  img {
    width: 30px;
  }
`

export default function Template({ data }) {
  const { markdownRemark, allMarkdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const postUrl = `${data.site.siteMetadata.siteUrl}${
    frontmatter.path
  }`.replace(/(^\w+:|^)\/\//, '')
  return (
    <div>
      <Helmet>
        <title>{`${frontmatter.title} | Timothy Vernon`}</title>
        <meta name="description" content={frontmatter.description} />
      </Helmet>
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
            {/* sharing buttons from:  */}
            {/* https://simplesharingbuttons.com/ */}
            <ShareSection>
              <p>Like what you've read? Give a share:</p>
              <ShareButtons>
                <li>
                  <a
                    href={`https://twitter.com/intent/tweet?source=https%3A%2F%2F${postUrl}&text=${
                      frontmatter.title
                    }:%20https%3A%2F%2F${postUrl}`}
                    target="_blank"
                    title="Tweet"
                    rel="noopener"
                  >
                    <img alt="Tweet" src={TwitterLogo} />
                  </a>
                </li>
                <li>
                  <a
                    href={`http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2F${postUrl}&title=${
                      frontmatter.title
                    }&summary=${
                      frontmatter.description
                    }&source=https%3A%2F%2F${postUrl}`}
                    target="_blank"
                    title="Share on LinkedIn"
                    rel="noopener"
                  >
                    <img alt="Share on LinkedIn" src={LinkedInLogo} />
                  </a>
                </li>
                <li>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2F${postUrl}&quote=${
                      frontmatter.title
                    }`}
                    title="Share on Facebook"
                    target="_blank"
                    rel="noopener"
                  >
                    <img alt="Share on Facebook" src={FacebookLogo} />
                  </a>
                </li>
              </ShareButtons>
            </ShareSection>
          </Blog>
        </ContentArea>
        {/* Navigation and other links go second */}
        <SidebarArea>
          <Sidebar isPrimary={false} />
          <RecentPosts posts={allMarkdownRemark} />
          <Social />
        </SidebarArea>
      </Page>
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        description
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { path: { ne: $path } } }
      limit: 3
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            description
          }
        }
      }
    }
  }
`
