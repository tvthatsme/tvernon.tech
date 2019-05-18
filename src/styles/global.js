import { grey, orange, lightOrange } from '../styles/colors'
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
  }

  h3 {
    font-size: 20pt;
    margin: 20pt 0;
    color: ${grey};
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
    background-color: #ddd;
    color: ${grey};
    text-shadow: none;
  }
`
}

export default injectGlobalStyles
