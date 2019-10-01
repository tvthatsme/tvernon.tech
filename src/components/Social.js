import React from 'react'
import styled from '@emotion/styled'
import { orange } from '../styles/colors'
import linkedInLogo from '../assets/logo-linkedin.png'
import githubLogo from '../assets/logo-github.png'
import twitterLogo from '../assets/logo-twitter.svg'

const Section = styled('div')`
  position: relative;
  background-color: #ef7125;
  padding: 50px 40px;
  color: white;
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

const Social = () => {
  return (
    <div>
      <Section>
        <h2 style={{ marginTop: 0, marginBottom: '20px', color: 'white' }}>
          Find me online
        </h2>
        <a
          style={LogoStyle}
          target="_blank"
          href="https://github.com/tvthatsme"
          rel="noopener noreferrer"
        >
          <LogoImg src={githubLogo} alt="My Github Profile" />
        </a>
        <a
          style={LinkedIn}
          target="_blank"
          href="https://linkedin.com/in/tnvernon"
          rel="noopener noreferrer"
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
          rel="noopener noreferrer"
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

export default Social
