import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { grey, orange } from '../styles/colors'
import { linkWithNoStyles } from '../styles/elements'

const Aside = styled.aside`
  padding: 20px 40px;
`

const Heading = styled.h2`
  margin-top: -20px;
  padding-bottom: 12pt;
  font-size: 20pt;
  border-bottom: 1px solid ${grey};
`

const LinkToPost = styled(Link)`
  ${linkWithNoStyles};
  display: block;
  padding-bottom: 10px;
  text-decoration: none;
  color: ${grey};
  background-color: white;
  padding: 20px;
  margin-bottom: 40px;
  border-bottom: 5px solid ${orange};

  &:hover {
    background: white;
  }
`

const LinkTitle = styled.p`
  margin-top: 0;
  font-weight: 500;
  text-decoration: underline;
`

const LinkTitleWithNoHelp = styled(LinkTitle)`
  margin-bottom: 0;
`

const LinkHelpText = styled.p`
  font-size: 12pt;
  margin-bottom: 0;
  font-style: italic;
`

const RecentPosts = props => {
  const posts = props.posts.edges
  return (
    <Aside>
      <Heading>Recent Posts</Heading>
      {posts.map(post => {
        const { date, path, title, description } = post.node.frontmatter
        const { id } = post.node
        return (
          <LinkToPost to={path} key={id}>
            <LinkTitle>{title}</LinkTitle>
            <LinkHelpText>{date}</LinkHelpText>
            <LinkHelpText>{description}</LinkHelpText>
          </LinkToPost>
        )
      })}
      <LinkToPost to="/">
        <LinkTitleWithNoHelp>All Posts</LinkTitleWithNoHelp>
      </LinkToPost>
    </Aside>
  )
}

export default RecentPosts
