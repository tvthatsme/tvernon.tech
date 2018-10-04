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

export const LargeTextBlock = css`
  margin-bottom: 80px;
  background-color: white;
  padding: 100px 120px;
  position: relative;
  border-bottom: 5px solid ${orange};

  @media (max-width: ${mobile}) {
    padding: 20px;
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
