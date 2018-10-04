import { grey } from '../styles/colors'
import { injectGlobal } from 'emotion'
import { mobile } from '../styles/breakpoints'

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

  h1,
  h2,
  h3 {
    @media (max-width: ${mobile}) {
      text-align: center;
    }
  }

  li,
  p {
    font-size: 14pt;
    font-weight: 300;
    line-height: 1.6;
  }

  p {
    margin: 12pt 0;
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
`
}

export default injectGlobalStyles
