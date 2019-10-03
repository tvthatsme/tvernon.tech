import React from 'react'

const ExternalLink = ({ href, children, ...rest }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
    {children}
  </a>
)

export default ExternalLink
