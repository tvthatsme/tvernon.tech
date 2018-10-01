import React from 'react'
import Link from 'gatsby-link'
import { css } from 'emotion'
import styled from 'react-emotion'

const Aside = styled('aside')`
  padding: 20px;
  background-color: #efefef;
  border-right: 1px solid #ddd;
`

const Heading = styled('p')`
  font-size: 26px;
`

const test = css`
  display: block;
  padding-bottom: 10px;
`

const RecentPosts = props => {
  const posts = props.posts.edges
  return (
    <Aside>
      <Heading>Recent Posts</Heading>
      {posts.map(post => {
        const { date, path, title } = post.node.frontmatter
        const { id } = post.node
        return (
          <Link
            className={css`
              ${test};
            `}
            to={path}
            key={id}
          >
            <p>{title}</p>
            <p>{date}</p>
          </Link>
        )
      })}
      <Link to="/blog">All Posts</Link>
    </Aside>
  )
}

export default RecentPosts
