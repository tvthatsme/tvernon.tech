import React from 'react'
import { css } from 'emotion'
import { h1 } from '../styles/elements'

const section = css`
  position: relative;
  background-color: #ef7125;
  padding: 50px 40px;
  color: white;
`

const helloStyles = {
  color: 'white',
  margin: 0,
}

const heading = css`
  ${h1} ${helloStyles};
`

const subHeading = css`
  margin-top: 0;
  margin-bottom: 30px;
  font-size: 24pt;
  color: white;
`

const image = {
  position: 'absolute',
  bottom: 0,
  transform: 'translateY(50%)',
  width: '140px',
  height: '140px',
  borderRadius: '100%',
  backgroundColor: 'white',
  padding: 5,
}

const Hello = (headingLevel1 = true) => {
  return (
    <div>
      <div className={section}>
        {headingLevel1 ? (
          <h1 className={heading}>Hello.</h1>
        ) : (
          <h2 className={heading}>Hello.</h2>
        )}
        <p className={subHeading}>I'm Timothy Vernon</p>
        <img
          className={css`
            ${image};
          `}
          alt="Timothy Vernon"
          src="https://res.cloudinary.com/vernon-cloud/image/upload/f_auto,q_auto/v1530884463/Timothy_Headshot_25.12.2016_b4g1ak.jpg"
        />
      </div>
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
