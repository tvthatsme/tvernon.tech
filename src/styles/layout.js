import styled from 'react-emotion'
import { mobile } from './breakpoints'

export const Page = styled('div')`
  display: grid;
  grid-template-columns: 6fr 3fr;
  grid-template-rows: 1fr;
  grid-gap: 60px;

  @media (max-width: ${mobile}) {
    grid-template-columns: 100%;
    grid-template-rows: auto auto;
    grid-gap: 0;
  }
`

export const ContentArea = styled('div')`
  grid-column: 1;
  grid-row: 1;
  max-width: 63.6vw;

  @media (max-width: ${mobile}) {
    grid-row: 1;
    max-width: 100%;
  }
`

export const SidebarArea = styled('div')`
  grid-column: 2;
  grid-row: 1;

  @media (max-width: ${mobile}) {
    grid-column: 1;
    grid-row: 2;
  }
`
