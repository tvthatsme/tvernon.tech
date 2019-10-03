import React from 'react'
import styled from '@emotion/styled'
import { orange } from '../styles/colors'
import ExternalLink from './ExternalLink'
import linkedInLogo from '../assets/logo-linkedin.png'
import githubLogo from '../assets/logo-github.png'
import twitterLogo from '../assets/logo-twitter.svg'

const HeadingSection = styled.div`
  position: relative;
  background-color: ${orange};
  padding: 50px 40px;
  color: white;
`

const Heading = styled.h2`
  margin-top: 0;
  margin-bottom: 20px;
  color: white;
`

const Description = styled.p`
  background-color: white;
  padding: 50px 40px 20px;
  margin: 0;
`

const LogoImg = styled.img`
  height: 40px;
  width: 40px;
  margin: 0 auto;
`

const SocialLink = styled(ExternalLink)`
  position: absolute;
  height: 70px;
  width: 70px;
  bottom: 0;
  transform: translateY(50%);
  border-radius: 50%;
  padding: 10px;
  border: 5px solid white;
  background-color: ${orange};
  ${props => (props.left ? `left: ${props.left}px` : ``)};

  &:hover {
    background: ${orange};
  }
`

const GithubLink = () => (
  <SocialLink href="https://github.com/tvthatsme">
    <LogoImg src={githubLogo} alt="My Github Profile" />
  </SocialLink>
)

const LinkedInLink = () => (
  <SocialLink href="https://linkedin.com/in/tnvernon" left={120}>
    <LogoImg
      src={linkedInLogo}
      alt="My LinkedIn Profile"
      style={{ marginLeft: '2px' }}
    />
  </SocialLink>
)

const TwitterLink = () => (
  <SocialLink href="https://twitter.com/tvernon_tech" left={200}>
    <LogoImg
      src={twitterLogo}
      alt="My Twitter Profile"
      style={{ transform: 'scale(1.4)' }}
    />
  </SocialLink>
)

const Social = () => {
  return (
    <div>
      <HeadingSection>
        <Heading>Find me online</Heading>
        <GithubLink />
        <LinkedInLink />
        <TwitterLink />
      </HeadingSection>
      <Description>
        Check out my open source work, professional experience, and tweets.
      </Description>
    </div>
  )
}

export default Social
