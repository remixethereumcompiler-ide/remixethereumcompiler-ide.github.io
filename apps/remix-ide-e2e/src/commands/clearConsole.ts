import { NightwatchBrowser } from 'nightwatch'
import EventEmitter from 'events'

class clearConsole extends EventEmitter {
  command (this: NightwatchBrowser): NightwatchBrowser {
    this.api.waitForElementVisible('*[data-id="terminalCli"]').click('#clearConsole').perform((done) => {
      done()
      this.emit('complete')
    })
    return this
  }
}

module.exports = clearConsole
