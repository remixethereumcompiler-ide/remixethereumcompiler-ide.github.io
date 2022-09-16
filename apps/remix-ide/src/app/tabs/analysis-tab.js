import React from 'react' // eslint-disable-line
import { ViewPlugin } from '@remixproject/engine-web'
import ReactDOM from 'react-dom'
import { EventEmitter } from 'events'
import {RemixUiStaticAnalyser} from '@remix-ui/static-analyser' // eslint-disable-line
import * as packageJson from '../../../../../package.json'
import Registry from '../state/registry'

var EventManager = require('../../lib/events')

const profile = {
  name: 'solidityStaticAnalysis',
  displayName: 'Solidity static analysis',
  methods: [],
  events: [],
  icon: 'assets/img/staticAnalysis.webp',
  description: 'Checks the contract code for security vulnerabilities and bad practices.',
  kind: 'analysis',
  location: 'sidePanel',
  documentation: 'https://remix-ide.readthedocs.io/en/latest/static_analysis.html',
  version: packageJson.version
}

class AnalysisTab extends ViewPlugin {
  constructor () {
    super(profile)
    this.event = new EventManager()
    this.events = new EventEmitter()
    this.registry = Registry.getInstance()
    this.element = document.createElement('div')
    this.element.setAttribute('id', 'staticAnalyserView')
    this._components = {}
    this._components.registry = this.registry
    this._deps = {
      offsetToLineColumnConverter: this.registry.get(
        'offsettolinecolumnconverter').api
    }
  }

  async onActivation () {
    const isSolidityActive = await this.call('manager', 'isActive', 'solidity')
    if (!isSolidityActive) {
      await this.call('manager', 'activatePlugin', 'solidity')
    }
    this.renderComponent()
  }

  render () {
    return this.element
  }

  renderComponent () {
    ReactDOM.render(
      <RemixUiStaticAnalyser
        registry={this.registry}
        analysisModule={this}
        event={this.event}
      />,
      this.element,
      () => {
        this.event.register('staticAnaysisWarning', (count) => {
          if (count > 0) {
            this.emit('statusChanged', { key: count, title: `${count} warning${count === 1 ? '' : 's'}`, type: 'warning' })
          } else if (count === 0) {
            this.emit('statusChanged', { key: 'succeed', title: 'no warning', type: 'success' })
          } else {
            // count ==-1 no compilation result
            this.emit('statusChanged', { key: 'none' })
          }
        })
      }
    )
  }
}

module.exports = AnalysisTab
