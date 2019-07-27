import { css } from 'emotion'
import { experience } from './breakpoints'
import { grey } from './colors'

export const h1 = css`
  font-size: 40pt;
  font-weight: 700;
  line-height: 1.1;
  color: ${grey};
  margin: 0 0 40px;

  @media (max-width: ${experience}) {
    font-size: 30pt;
  }
`

export const linkWithNoStyles = css`
  box-shadow: none;

  &:hover {
    background: none;
  }
`
