import styled from 'react-emotion'
import { css } from 'emotion'
import { orange } from './colors'
import { h1 } from './elements'
import { mobile } from './breakpoints'

export const Blog = styled('div')`
  background-color: white;
  padding: 100px 120px;

  @media (max-width: 1000px) {
    padding: 10vw;
  }
`

export const BlogPreview = styled('div')`
  display: grid;
  grid-template-columns: 1fr 6fr;
  grid-template-rows: 1fr auto auto;
  margin-bottom: 80px;
  background-color: white;
  padding: 100px 120px;
  position: relative;
  border-bottom: 5px solid ${orange};

  @media (max-width: ${mobile}) {
    grid-template-columns: 100%;
    grid-template-rows: auto auto auto auto;
    padding: 20px;
  }
`

export const BlogTitle = css`
  ${h1};
`

// styled('h2')`
//   grid-column: 1 / span 2;
//   grid-row: 1;
//   font-size: 55px; --
//   line-height: 57px; --
//   font-weight: 700; --
//   display: flex;
//   align-items: center;
//   z-index: 2;
//   color: ${grey}; --
//   margin: 0 0 ${spacingMedium};
// `

// font-size: 40pt;
//   font-weight: 700;
//   line-height: 1.1;
//   color: ${grey};
