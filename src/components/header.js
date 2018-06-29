import React from 'react'
import Link from 'gatsby-link'
import { css } from 'emotion'

const headerClass = css`
  font-size: 20px;
`

const Header = ({ siteTitle }) => (
  <div className={headerClass}>
    <div>
      <h1>
        <Link to="/">{siteTitle}</Link>
      </h1>
    </div>
  </div>
)

export default Header
