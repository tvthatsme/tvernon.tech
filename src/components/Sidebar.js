import React from 'react'
import { css } from 'emotion'
import { Link } from 'gatsby'
import Hello from '../components/Hello'
import { grey, black } from '../styles/colors'
import { linkWithNoStyles } from '../styles/elements'

const SideLinks = css`
  padding: 40px;
  margin-bottom: 20px;
`

const SideLink = css`
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

const Sidebar = props => {
  const { isPrimary = true } = props
  return (
    <div>
      <Hello headingLevel1={isPrimary} />
      <div className={SideLinks}>
        <Link
          to="/"
          className={css`
            ${linkWithNoStyles} ${SideLink};
          `}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={css`
            ${linkWithNoStyles} ${SideLink};
          `}
        >
          About
        </Link>
        <Link
          to="/experience"
          className={css`
            ${linkWithNoStyles} ${SideLink};
          `}
        >
          Experience
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
