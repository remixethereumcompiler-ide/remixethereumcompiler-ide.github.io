import { CLEAR_CONSOLE, CMD_HISTORY, EMPTY_BLOCK, ERROR, HTML, INFO, KNOWN_TRANSACTION, LISTEN_ON_NETWORK, LOG, NEW_TRANSACTION, SCRIPT, UNKNOWN_TRANSACTION, WARN } from '../types/terminalTypes'

export const initialState = {
  journalBlocks: [
  ],
  data: {
    // lineLength: props.options.lineLength || 80,
    session: [],
    activeFilters: { commands: {}, input: '' },
    filterFns: {}
  },
  _commandHistory: [],
  _commands: {},
  commands: {},
  _JOURNAL: [],
  _jobs: [],
  _INDEX: {
  },
  _INDEXall: [],
  _INDEXallMain: [],
  _INDEXcommands: {},
  _INDEXcommandsMain: {},
  message: []
}

export const registerCommandReducer = (state, action) => {
  switch (action.type) {
    case HTML :
      return {
        ...state,
        _commands: Object.assign(initialState._commands, action.payload._commands),
        commands: Object.assign(initialState.commands, action.payload.commands),
        data: Object.assign(initialState.data, { ...action.payload.data })
      }
    case LOG:
      return {
        ...state,
        _commands: Object.assign(initialState._commands, action.payload._commands),
        commands: Object.assign(initialState.commands, action.payload.commands),
        data: Object.assign(initialState.data, { ...action.payload.data })

      }
    case INFO:
      return {
        ...state,
        _commands: Object.assign(initialState._commands, action.payload._commands),
        commands: Object.assign(initialState.commands, action.payload.commands),
        data: Object.assign(initialState.data, action.payload.data)
      }
    case WARN:
      return {
        ...state,
        _commands: Object.assign(initialState._commands, action.payload._commands),
        commands: Object.assign(initialState.commands, action.payload.commands),
        data: Object.assign(initialState.data, action.payload.data)
      }
    case ERROR:
      return {
        ...state,
        _commands: Object.assign(initialState._commands, action.payload._commands),
        commands: Object.assign(initialState.commands, action.payload.commands),
        data: Object.assign(initialState.data, action.payload.data)
      }
    case SCRIPT:
      return {
        ...state,
        _commands: Object.assign(initialState._commands, action.payload._commands),
        commands: Object.assign(initialState.commands, action.payload.commands),
        data: Object.assign(initialState.data, action.payload.data)
      }
    case CLEAR_CONSOLE:
      return {
        ...state,
        ...state.journalBlocks.splice(0)
      }
    case LISTEN_ON_NETWORK:
      return {
        ...state,
        journalBlocks: initialState.journalBlocks.push({ message: action.payload.message, style: 'text-info' })
      }
    default :
      return { state }
  }
}

export const registerFilterReducer = (state, action) => {
  switch (action.type) {
    case LOG:
      return {
        ...state,
        data: Object.assign(initialState.data.filterFns, action.payload.data.filterFns)

      }
    case INFO:
      return {
        ...state,
        data: Object.assign(initialState.data.filterFns, action.payload.data.filterFns)
      }
    case WARN:
      return {
        ...state,
        data: Object.assign(initialState.data.filterFns, action.payload.data.filterFns)
      }
    case ERROR:
      return {
        ...state,
        data: Object.assign(initialState.data.filterFns, action.payload.data.filterFns)
      }
    case SCRIPT:
      return {
        ...state,
        data: Object.assign(initialState.data.filterFns, action.payload.data.filterFns)
      }
    default :
      return { state }
  }
}

export const addCommandHistoryReducer = (state, action) => {
  switch (action.type) {
    case CMD_HISTORY:
      return {
        ...state,
        _commandHistory: initialState._commandHistory.unshift(action.payload.script)

      }
    default :
      return { state }
  }
}

export const remixWelcomeTextReducer = (state, action) => {
  switch (action.type) {
    case 'welcomeText' :
      return {
        ...state,
        journalBlocks: initialState.journalBlocks.push(action.payload.welcomeText)
      }
  }
}

export const registerScriptRunnerReducer = (state, action) => {
  switch (action.type) {
    case HTML:
      return {
        ...state,
        journalBlocks: initialState.journalBlocks.push({ message: action.payload.message, style: 'text-log', provider: action.payload.provider })
      }
    case LOG:
      return {
        ...state,
        journalBlocks: initialState.journalBlocks.push({ message: action.payload.message, style: 'text-info', provider: action.payload.provider })
      }
    case INFO:
      return {
        ...state,
        journalBlocks: initialState.journalBlocks.push({ message: action.payload.message, style: 'text-info', provider: action.payload.provider })
      }
    case WARN:
      return {
        ...state,
        journalBlocks: initialState.journalBlocks.push({ message: action.payload.message, style: 'text-warning', provider: action.payload.provider })
      }
    case ERROR:
      return {
        ...state,
        journalBlocks: initialState.journalBlocks.push({ message: action.payload.message, style: 'text-danger', provider: action.payload.provider })
      }
    case SCRIPT:
      return {
        ...state,
        journalBlocks: initialState.journalBlocks.push({ message: action.payload.message, style: 'text-log', provider: action.payload.provider })
      }
    case KNOWN_TRANSACTION:
      return {
        ...state,
        journalBlocks: initialState.journalBlocks.push({ message: action.payload.message, style: '', name: 'knownTransaction', provider: action.payload.provider })
      }
    case UNKNOWN_TRANSACTION:
      return {
        ...state,
        journalBlocks: initialState.journalBlocks.push({ message: action.payload.message, style: '', name: 'unknownTransaction', provider: action.payload.provider })
      }
    case EMPTY_BLOCK:
      return {
        ...state,
        journalBlocks: initialState.journalBlocks.push({ message: action.payload.message, style: '', name: 'emptyBlock', provider: action.payload.provider })
      }
    case NEW_TRANSACTION:
      return {
        ...state,
        journalBlocks: initialState.journalBlocks.push({ message: action.payload.message, style: '', provider: action.payload.provider })
      }
  }
}
