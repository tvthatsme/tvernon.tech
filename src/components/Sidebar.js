import React from 'react'
import styled from 'react-emotion'
import Link from 'gatsby-link'
import { css } from 'emotion'
import { h1 } from '../styles/elements'
import Hello from '../components/Hello'

const Section = styled('div')`
  position: relative;
  background-color: #ef7125;
  padding: 50px 40px;
  color: white;
`

const SideLinks = styled('div')`
  padding: 40px;
  margin-bottom: 20px;
`

const SideLink = styled(Link)`
  display: block;
  padding: 20px 0;
  border-bottom: 1px solid grey;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  text-decoration-color: black;
  text-decoration-line: none;
  color: #31393c;

  &:hover {
    color: #df6416;
  }
`

const LogoImg = styled('img')`
  height: 40px;
  width: 40px;
  margin: 0 auto;
`

const LogoStyle = {
  position: 'absolute',
  height: '70px',
  width: '70px',
  bottom: 0,
  transform: 'translateY(50%)',
  borderRadius: '50%',
  padding: 10,
  border: '5px solid white',
  backgroundColor: orange,
}

const LinkedIn = Object.assign({}, LogoStyle, { left: '30%' })

const Twitter = Object.assign({}, LogoStyle, { left: '50%' })

import linkedInLogo from '../assets/logo-linkedin.png'
import githubLogo from '../assets/logo-github.png'
import twitterLogo from '../assets/logo-twitter.svg'
import { orange } from '../styles/colors'

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
      <Section>
        <h2 style={{ marginTop: 0, marginBottom: '20px', color: 'white' }}>
          Find me online
        </h2>
        <a
          style={LogoStyle}
          target="_blank"
          href="https://github.com/tvthatsme"
        >
          <LogoImg src={githubLogo} alt="My Github Profile" />
        </a>
        <a
          style={LinkedIn}
          target="_blank"
          href="https://linkedin.com/in/tnvernon"
        >
          <LogoImg
            src={linkedInLogo}
            alt="My LinkedIn Profile"
            style={{ marginLeft: '2px' }}
          />
        </a>
        <a
          style={Twitter}
          target="_blank"
          href="https://twitter.com/tvernon_tech"
        >
          <LogoImg
            src={twitterLogo}
            alt="My Twitter Profile"
            style={{ transform: 'scale(1.4)' }}
          />
        </a>
      </Section>
      <div style={{ backgroundColor: 'white', padding: '50px 40px 20px' }}>
        <p>
          Check out my open source work, professional experience, and tweets.
        </p>
      </div>
    </div>
  )
}

export default Sidebar
