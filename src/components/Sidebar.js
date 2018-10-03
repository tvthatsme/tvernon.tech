import React from 'react'
import styled from 'react-emotion'
import Link from 'gatsby-link'
import Hello from '../components/Hello'
import { grey, black } from '../styles/colors'

const SideLinks = styled('div')`
  padding: 40px;
  margin-bottom: 20px;
`

const SideLink = styled(Link)`
  display: block;
  padding: 20px 0;
  border-bottom: 1px solid ${grey};
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  text-decoration-color: ${black};
  text-decoration-line: none;
  color: #31393c;

  &:hover {
    color: #df6416;
  }
`

const Sidebar = props => {
  const { isPrimary = true } = props
  return (
    <div>
      <Hello headingLevel1={isPrimary} />
      <SideLinks>
        <SideLink to="/">Home</SideLink>
        <SideLink to="/about">About</SideLink>
        <SideLink to="/experience">Experience</SideLink>
      </SideLinks>
    </div>
  )
}

export default Sidebar
