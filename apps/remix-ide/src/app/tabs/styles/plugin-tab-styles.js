var csjs = require('csjs-inject')

const css = csjs`
  .pluginTabView {
    height: 100%;
    width: 100%;
  }
  .iframe {
    height: 100%;
    width: 100%;
    border: 0;
  }
`

module.exports = css
