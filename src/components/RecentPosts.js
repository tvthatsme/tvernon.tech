import React from 'react'
import { Link } from 'gatsby'
import { css } from 'emotion'
import styled from 'react-emotion'
import { grey, orange } from '../styles/colors'
import { linkWithNoStyles } from '../styles/elements'

const Aside = styled('aside')`
  padding: 20px 40px;
`

const Heading = styled('h2')`
  margin-top: -20px;
  padding-bottom: 12pt;
  font-size: 20pt;
  border-bottom: 1px solid ${grey};
`

const link = css`
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

const titleText = css`
  margin-top: 0;
  font-weight: 500;
  text-decoration: underline;
`

const smallText = css`
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
          <Link
            className={css`
              ${linkWithNoStyles} ${link};
            `}
            to={path}
            key={id}
          >
            <p
              className={css`
                ${titleText};
              `}
            >
              {title}
            </p>
            <p
              className={css`
                ${smallText};
              `}
            >
              {date}
            </p>
            <p
              className={css`
                ${smallText};
              `}
            >
              {description}
            </p>
          </Link>
        )
      })}
      <Link
        to="/"
        className={css`
          ${linkWithNoStyles} ${link};
        `}
      >
        <p
          className={css`
            ${titleText};
            margin-bottom: 0;
          `}
        >
          All Posts
        </p>
      </Link>
    </Aside>
  )
}

export default RecentPosts
