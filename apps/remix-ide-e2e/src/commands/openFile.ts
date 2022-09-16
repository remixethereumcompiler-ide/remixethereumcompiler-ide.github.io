import { NightwatchBrowser } from 'nightwatch'
import EventEmitter from 'events'

class OpenFile extends EventEmitter {
  command (this: NightwatchBrowser, name: string) {
    this.api.perform((done) => {
      openFile(this.api, name, () => {
        done()
        this.emit('complete')
      })
    })
    return this
  }
}

// click on fileExplorer can toggle it. We go through settings to be sure FE is open
function openFile (browser: NightwatchBrowser, name: string, done: VoidFunction) {
  browser.clickLaunchIcon('settings').clickLaunchIcon('filePanel')
    .waitForElementVisible('li[data-id="treeViewLitreeViewItem' + name + '"', 60000)
    .click('li[data-id="treeViewLitreeViewItem' + name + '"')
    .pause(2000)
    .perform(() => {
      done()
    })
}

module.exports = OpenFile
