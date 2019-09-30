import React from 'react'
import styled from '@emotion/styled'
import { grey } from '../styles/colors'
import { experience } from '../styles/breakpoints'

const Container = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${grey};

  @media (max-width: ${experience}) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }
`

const ImageContainer = styled('div')`
  display: inline;

  @media (max-width: ${experience}) {
    margin: 0 auto 20px;
  }
`

const Info = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Date = styled('p')`
  text-align: right;
  margin: 0;
  font-size: 18pt;
  line-height: 20pt;
  font-weight: 500;

  @media (max-width: ${experience}) {
    text-align: center;
  }
`

const Place = styled('p')`
  text-align: right;
  margin: 6px 0 0;
  font-weight: 300;

  @media (max-width: ${experience}) {
    text-align: center;
  }
`

const ExperienceOverview = props => {
  return (
    <Container>
      <ImageContainer>{props.children}</ImageContainer>
      <Info>
        <Date>{props.startDate} through</Date>
        <Date>{props.endDate}</Date>
        <Place>{props.location}</Place>
      </Info>
    </Container>
  )
}

export default ExperienceOverview
