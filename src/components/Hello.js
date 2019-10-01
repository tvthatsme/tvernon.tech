import React from 'react'
import { h1 } from '../styles/elements'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

const Section = styled.div`
  position: relative;
  background-color: #ef7125;
  padding: 50px 40px;
  color: white;
`
const Heading1 = styled.h1`
  color: white;
  margin: 0;
`

const Heading2 = styled.h2`
  color: white;
  margin: 0;
`

const SubHeading = styled.p`
  margin-top: 0;
  margin-bottom: 30px;
  font-size: 24pt;
  color: white;
`

const Image = styled.img`
  position: absolute;
  bottom: 0;
  transform: translateY(50%);
  width: 140px;
  height: 140px;
  border-radius: 100%;
  background-color: white;
  padding: 5px;
`

const Hello = (headingLevel1 = true) => {
  return (
    <div>
      <Section>
        {headingLevel1 ? (
          <Heading1>Hello.</Heading1>
        ) : (
          <Heading2>Hello.</Heading2>
        )}
        <SubHeading>I'm Timothy Vernon</SubHeading>
        <Image
          alt="Timothy Vernon"
          src="https://res.cloudinary.com/vernon-cloud/image/upload/f_auto,q_auto/v1530884463/Timothy_Headshot_25.12.2016_b4g1ak.jpg"
        />
      </Section>
      <div style={{ backgroundColor: 'white', padding: '70px 40px 20px' }}>
        <p>
          I build beautiful, modern web applications with Javascript. This is my
          website where I write about what I am learning and my experiences.
        </p>
      </div>
    </div>
  )
}

export default Hello
