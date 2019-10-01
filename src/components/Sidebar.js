import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import Hello from '../components/Hello'
import { grey, black } from '../styles/colors'
import { linkWithNoStyles } from '../styles/elements'

const SideLinks = styled.div`
  padding: 40px;
  margin-bottom: 20px;
`

const SidebarLink = styled(Link)`
  ${linkWithNoStyles};
  display: block;
  padding: 20px 0;
  border-bottom: 1px solid ${grey};
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  text-decoration-color: ${black};
  text-decoration-line: none;
  color: #31393c;
  transition: none;

  &:hover {
    color: #df6416;
  }
`

const Sidebar = ({ isPrimary = true }) => {
  return (
    <div>
      <Hello headingLevel1={isPrimary} />
      <SideLinks>
        <SidebarLink to="/">Home</SidebarLink>
        <SidebarLink to="/about">About</SidebarLink>
        <SidebarLink to="/experience">Experience</SidebarLink>
      </SideLinks>
    </div>
  )
}

export default Sidebar
