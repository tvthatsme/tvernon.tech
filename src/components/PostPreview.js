import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { orange, blue, grey } from '../styles/colors'
import { BlogPreview } from '../styles/blog'
import { h1 } from '../styles/elements'
import { css } from 'emotion'
import { mobile } from '../styles/breakpoints'
import { linkWithNoStyles } from '../styles/elements'

const spacingMedium = '40px'

const HeaderLink = styled(Link)`
  grid-column: 1 / span 2;
  grid-row: 1;

  @media (max-width: ${mobile}) {
    grid-column: 1;
    margin: 0;
  }
`

const header = css`
  ${h1};
`

const ColorDiv = styled('div')`
  grid-row: 1 / span 3;
  grid-column: 1;
  z-index: 1;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(1, 111, 185, 1)
  );

  @media (max-width: ${mobile}) {
    display: none;
  }
`

const Date = styled('p')`
  grid-column: 1;
  grid-row: 2;
  text-align: center;
  display: flex;
  flex-direction: column;
  color: ${grey};
  z-index: 2;
  padding-top: 5px;
`

const DayAndMonth = styled('span')`
  display: block;
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  padding-bottom: 3px;
`

const Year = styled('span')`
  display: block;
  width: 100%;
  font-weight: 300;
`

const ShortDescription = styled('div')`
  grid-column: 2;
  grid-row: 2;
  max-width: 600px;
  padding-left: ${spacingMedium};
  color: ${grey};

  @media (max-width: ${mobile}) {
    grid-column: 1;
    grid-row: 3;
    padding-left: 0;
    max-width: 100%;
  }
`

const More = styled('div')`
  grid-column: 2;
  display: flex;
  flex-direction: row-reverse;
  padding-top: ${spacingMedium};

  @media (max-width: ${mobile}) {
    grid-column: 1;
  }
`

const button = css`
  grid-column: 2;
  padding: 10px 20px;
  border: 3px solid ${orange};
  color: ${orange};
  font-weight: 600;
  text-transform: uppercase;
  text-decoration-line: none;
  display: inline-block;

  &:hover {
    cursor: pointer;
    color: white;
    background-color: ${blue};
    border: 3px solid ${blue};
  }
`

const PostPreview = props => {
  const { post } = props

  // Get the parts of the date we are interested in
  const date = post.frontmatter.date.split(',')
  const dayAndMonth = date[0]
  const year = date[1]

  // Limit the preview to from the title to the first h2 instance
  const firstH2Index = post.html.indexOf('h2') - 1

  return (
    <BlogPreview>
      <HeaderLink
        to={post.frontmatter.path}
        style={{ textDecoration: 'none' }}
        className={linkWithNoStyles}
      >
        <h2 className={header}>{post.frontmatter.title}</h2>
      </HeaderLink>
      <ColorDiv />
      <Date>
        <DayAndMonth>{dayAndMonth}</DayAndMonth>
        <Year>{year}</Year>
      </Date>
      <ShortDescription
        dangerouslySetInnerHTML={{ __html: post.html.substr(0, firstH2Index) }}
      />
      <More>
        <Link
          to={post.frontmatter.path}
          className={css`
            ${linkWithNoStyles} ${button};
          `}
        >
          Read More
        </Link>
      </More>
    </BlogPreview>
  )
}

export default PostPreview
