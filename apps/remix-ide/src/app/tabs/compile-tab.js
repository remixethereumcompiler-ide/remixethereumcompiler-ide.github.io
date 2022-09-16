/* global */
import React from 'react' // eslint-disable-line
import ReactDOM from 'react-dom'
import { SolidityCompiler } from '@remix-ui/solidity-compiler' // eslint-disable-line
import { CompileTabLogic } from '@remix-ui/solidity-compiler' // eslint-disable-line
import { CompilerApiMixin } from '@remixproject/solidity-compiler-plugin'
import { ViewPlugin } from '@remixproject/engine-web'
import QueryParams from '../../lib/query-params'
// import { ICompilerApi } from '@remix-project/remix-lib-ts'
import * as packageJson from '../../../../../package.json'
import { compilerConfigChangedToastMsg, compileToastMsg } from '@remix-ui/helper'

const profile = {
  name: 'solidity',
  displayName: 'Solidity compiler',
  icon: 'assets/img/solidity.webp',
  description: 'Compile solidity contracts',
  kind: 'compiler',
  permission: true,
  location: 'sidePanel',
  documentation: 'https://remix-ide.readthedocs.io/en/latest/solidity_editor.html',
  version: packageJson.version,
  methods: ['getCompilationResult', 'compile', 'compileWithParameters', 'setCompilerConfig', 'compileFile', 'getCompilerState']
}

// EditorApi:
// - events: ['compilationFinished'],
// - methods: ['getCompilationResult']

class CompileTab extends CompilerApiMixin(ViewPlugin) { // implements ICompilerApi
  constructor (config, fileManager) {
    super(profile)
    this.fileManager = fileManager
    this.config = config
    this.queryParams = new QueryParams()
    this.compileTabLogic = new CompileTabLogic(this, this.contentImport)
    this.compiler = this.compileTabLogic.compiler
    this.compileTabLogic.init()
    this.initCompilerApi()
    this.el = document.createElement('div')
    this.el.setAttribute('id', 'compileTabView')
  }

  renderComponent () {
    ReactDOM.render(
      <SolidityCompiler api={this}/>
      , this.el)
  }

  onCurrentFileChanged () {
    this.renderComponent()
  }

  onResetResults () {
    this.renderComponent()
  }

  onSetWorkspace () {
    this.renderComponent()
  }

  onNoFileSelected () {
    this.renderComponent()
  }

  onCompilationFinished () {
    this.renderComponent()
  }

  render () {
    this.renderComponent()

    return this.el
  }

  async compileWithParameters (compilationTargets, settings) {
    return await super.compileWithParameters(compilationTargets, settings)
  }

  getCompilationResult () {
    return super.getCompilationResult()
  }

  getFileManagerMode () {
    return this.fileManager.mode
  }

  /**
   * set the compiler configuration
   * This function is used by remix-plugin compiler API.
   * @param {object} settings {evmVersion, optimize, runs, version, language}
   */
  setCompilerConfig (settings) {
    super.setCompilerConfig(settings)
    this.renderComponent()
    // @todo(#2875) should use loading compiler return value to check whether the compiler is loaded instead of "setInterval"
    const value = JSON.stringify(settings, null, '\t')
  
    this.call('notification', 'toast', compilerConfigChangedToastMsg(this.currentRequest.from, value))
  }

  compile (fileName) {
    this.call('notification', 'toast', compileToastMsg(this.currentRequest.from, fileName))
    super.compile(fileName)
  }

  compileFile (event) {
    return super.compileFile(event)
  }

  async onActivation () {
    super.onActivation()
    this.on('filePanel', 'workspaceInitializationCompleted', () => {
      this.call('filePanel', 'registerContextMenuItem', {
        id: 'solidity',
        name: 'compileFile',
        label: 'Compile',
        type: [],
        extension: ['.sol'],
        path: [],
        pattern: []
      })
    })
    try {
      this.currentFile = await this.call('fileManager', 'file')
    } catch (error) {
      if (error.message !== 'Error: No such file or directory No file selected') throw error
    }
  }

  getCompilerParameters () {
    const params = this.queryParams.get()
    params.optimize = (params.optimize === 'false' || params.optimize === null || params.optimize === undefined) ? false : params.optimize
    params.optimize = params.optimize === 'true' ? true : params.optimize
    return params
  }

  setCompilerParameters (params) {
    this.queryParams.update(params)
  }

  async getAppParameter (name) {
    return await this.call('config', 'getAppParameter', name)
  }

  async setAppParameter (name, value) {
    await this.call('config', 'setAppParameter', name, value)
  }
}

module.exports = CompileTab
