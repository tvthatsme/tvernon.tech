import React from 'react'
import RecentPosts from '../components/RecentPosts'
import { Page, SidebarArea, ContentArea } from '../styles/layout'
import Sidebar from '../components/Sidebar'
import { Blog } from '../styles/blog'
import { h1, linkWithNoStyles } from '../styles/elements'
import Helmet from 'react-helmet'
import FacebookLogo from '../assets/Facebook.svg'
import LinkedInLogo from '../assets/LinkedIn.svg'
import TwitterLogo from '../assets/Twitter.svg'
import styled from '@emotion/styled'
import Social from '../components/Social'
import { graphql } from 'gatsby'
import { Global } from '@emotion/core'
import globalStyles from '../styles/global'

// require styles for code syntax highlighting
require('prismjs/themes/prism-okaidia.css')

const Header = styled.h1`
  ${h1};
`

const SocialLink = styled.a`
  ${linkWithNoStyles};
`

const ShareSection = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 40px;
`

const ShareButtons = styled.ul`
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

const Date = styled.time`
  display: block;
  margin-bottom: 28pt;
  font-size: 14pt;
  font-style: italic;
`

export default function Template({ data }) {
  const { markdownRemark, allMarkdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const postUrl = `${data.site.siteMetadata.siteUrl}${
    frontmatter.path
  }`.replace(/(^\w+:|^)\/\//, '')
  const title = `${frontmatter.title} | Timothy Vernon`
  const image =
    'https://res.cloudinary.com/vernon-cloud/image/upload/f_auto,q_auto,w_400/v1530884463/Timothy_Headshot_25.12.2016_b4g1ak.jpg'
  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={frontmatter.description} />
        <meta property="og:title" content={title} />
        <meta
          property="og:url"
          content={`${data.site.siteMetadata.siteUrl}${frontmatter.path}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:description" content={frontmatter.description} />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={frontmatter.description} />
        <meta
          name="twitter:url"
          content={`${data.site.siteMetadata.siteUrl}${frontmatter.path}`}
        />
        <meta name="twitter:image" content={image} />
      </Helmet>
      <Global styles={globalStyles} />
      <Page>
        {/* Content goes first for seo */}
        <ContentArea>
          <Blog>
            <Header>{frontmatter.title}</Header>
            <Date>{frontmatter.date}</Date>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            {/* sharing buttons from:  */}
            {/* https://simplesharingbuttons.com/ */}
            <ShareSection>
              <p>Like what you've read? Give a share:</p>
              <ShareButtons>
                <li>
                  <SocialLink
                    href={`https://twitter.com/intent/tweet?source=https%3A%2F%2F${postUrl}&text=${
                      frontmatter.title
                    }:%20https%3A%2F%2F${postUrl}`}
                    target="_blank"
                    title="Tweet"
                    rel="noopener noreferrer"
                  >
                    <img alt="Tweet" src={TwitterLogo} />
                  </SocialLink>
                </li>
                <li>
                  <SocialLink
                    href={`http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2F${postUrl}&title=${
                      frontmatter.title
                    }&summary=${
                      frontmatter.description
                    }&source=https%3A%2F%2F${postUrl}`}
                    target="_blank"
                    title="Share on LinkedIn"
                    rel="noopener noreferrer"
                  >
                    <img alt="Share on LinkedIn" src={LinkedInLogo} />
                  </SocialLink>
                </li>
                <li>
                  <SocialLink
                    href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2F${postUrl}&quote=${
                      frontmatter.title
                    }`}
                    title="Share on Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img alt="Share on Facebook" src={FacebookLogo} />
                  </SocialLink>
                </li>
              </ShareButtons>
            </ShareSection>
          </Blog>
        </ContentArea>
        {/* Navigation and other links go second */}
        <SidebarArea>
          <Sidebar isPrimary={false} />
          <p>Test</p>
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
