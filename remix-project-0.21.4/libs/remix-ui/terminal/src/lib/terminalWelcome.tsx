import React from 'react' // eslint-disable-line

const TerminalWelcomeMessage = ({ packageJson }) => {
  return (
    <div className="remix_ui_terminal_block px-4 " data-id="block_null">
      <div> - Welcome to Remix {packageJson} - </div><br />
      <div>You can use this terminal to: </div>
      <ul className='ml-0 mr-4'>
        <li>Check transactions details and start debugging.</li>
        <li>Execute JavaScript scripts:
          <br />
          <i> - Input a script directly in the command line interface </i>
          <br />
          <i> - Select a Javascript file in the file explorer and then run \`remix.execute()\` or \`remix.exeCurrent()\`  in the command line interface  </i>
          <br />
          <i> - Right click on a JavaScript file in the file explorer and then click \`Run\` </i>
        </li>
      </ul>
      <div>The following libraries are accessible:</div>
      <ul className='ml-0 mr-4'>
        <li><a target="_blank" href="https://web3js.readthedocs.io/en/1.0/">web3 version 1.5.2</a></li>
        <li><a target="_blank" href="https://docs.ethers.io">ethers.js</a> </li>
        <li>remix (run remix.help() for more info)</li>
      </ul>
    </div>
  )
}

export default TerminalWelcomeMessage
