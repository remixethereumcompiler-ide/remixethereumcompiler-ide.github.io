import { textDark, textSecondary } from './constants'

declare global {
  interface Window {
    _paq: any
  }
}

const _paq = window._paq = window._paq || [] //eslint-disable-line

export const generateContractMetadat = (config, checked, dispatch) => {
  config.set('settings/generate-contract-metadata', checked)
  dispatch({ type: 'contractMetadata', payload: { isChecked: checked, textClass: checked ? textDark : textSecondary } })
}

export const ethereumVM = (config, checked: boolean, dispatch) => {
  config.set('settings/always-use-vm', checked)
  dispatch({ type: 'ethereumVM', payload: { isChecked: checked, textClass: checked ? textDark : textSecondary } })
}

export const textWrapEventAction = (config, editor, checked, dispatch) => {
  config.set('settings/text-wrap', checked)
  editor.resize(checked)
  dispatch({ type: 'textWrap', payload: { isChecked: checked, textClass: checked ? textDark : textSecondary } })
}

export const personal = (config, checked, dispatch) => {
  config.set('settings/personal-mode', checked)
  dispatch({ type: 'personal', payload: { isChecked: checked, textClass: checked ? textDark : textSecondary } })
}

export const useMatomoAnalytics = (config, checked, dispatch) => {
  config.set('settings/matomo-analytics', checked)
  dispatch({ type: 'useMatomoAnalytics', payload: { isChecked: checked, textClass: checked ? textDark : textSecondary } })
  if (checked) {
    _paq.push(['forgetUserOptOut'])
    // @TODO remove next line when https://github.com/matomo-org/matomo/commit/9e10a150585522ca30ecdd275007a882a70c6df5 is used
    document.cookie = 'mtm_consent_removed=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  } else {
    _paq.push(['optUserOut'])
  }
}

export const saveTokenToast = (config, dispatch, tokenValue) => {
  config.set('settings/gist-access-token', tokenValue)
  dispatch({ type: 'save', payload: { message: 'Access token has been saved' } })
}

export const removeTokenToast = (config, dispatch) => {
  config.set('settings/gist-access-token', '')
  dispatch({ type: 'removed', payload: { message: 'Access token removed' } })
}
