import { grey, orange, lightOrange } from '../styles/colors'
import { experience, mobile } from './breakpoints'
import { injectGlobal } from 'emotion'

const injectGlobalStyles = () => {
  injectGlobal`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    text-rendering: optimizeLegibility;
  }

  body {
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    background-color: #eee;
  }

  h1 {
    font-size: 40pt;
    font-weight: 700;
    line-height: 1.1;
    color: ${grey};
  }

  h2 {
    font-size: 26pt;
    font-weight: 700;
    line-height: 1.2;
    margin: 30pt 0;
    color: ${grey};

    @media (max-width: ${experience}) {
      font-size: 20pt;
    }
  }

  h3 {
    font-size: 20pt;
    margin: 20pt 0;
    color: ${grey};
  }

  ul {
    padding-left: 24px;
  }

  li,
  p {
    font-size: 14pt;
    font-weight: 300;
    line-height: 1.6;
  }

  p {
    color: ${grey};
    margin: 12pt 0;
  }

  a {
    border-color: ${grey};
    box-shadow: inset 0 -3px 0 ${orange};
    padding-bottom: 2px;
    padding-top: 2px;
    transition: all 0.25s linear;
    text-decoration: none;

    &:link,
    &:visited {
      color: ${grey};
      text-decoration: none;
    }

    &:hover {
      background: ${lightOrange};
      text-decoration: none;
    }
  }

  pre[class*="language-"] {
    background-color: ${grey};
  }

  .language-text {
    font-size: 12pt;
  }

  pre[class*="language-"] {
    border-radius: 0;
  }

  /* Inline code snippets encosed by single backticks */
  :not(pre) > code[class*="language-"] {
    background-color: #ddd !important;
    color: ${grey};
    text-shadow: none;
  }

  .gatsby-highlight {
    background-color: #272822;
    border-radius: 0.3em;
    margin: 0.5em 0;
    padding: 1em;
    overflow: auto;

    @media (max-width: ${mobile}) {
      width: 100vw;
      position: relative;
      left: 50%;
      right: 50%;
      margin-left: -50vw;
      margin-right: -50vw;
      border-radius: 0;
      font-size: 11pt;
    }
  }

  .gatsby-highlight pre[class*="language-"] {
    background-color: transparent;
    margin: 0;
    padding: 0;
    overflow: initial;
    float: left;
    min-width: 100%;
  }

  .gatsby-highlight-code-line {
    background-color: #444;
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 0.75em;
    border-left: 6px solid ${orange};
  }


`
}

export default injectGlobalStyles
