import { checkSpecialChars } from '@remix-ui/helper'
import { BadgeStatus, IconStatus } from '../components/Icon'

export type IconBadgeReducerAction = {
  readonly type: string
  readonly payload: any
}

/**
   * Set a new status for the @arg name
   * @param {String} name
   * @param {Object} status
   */

function setIconStatus(name: string, status: IconStatus) {
  if (status.key === 'none') return { ...status, text: '' } // remove status

  let text = ''
  let key = ''
  if (typeof status.key === 'number') {
    key = status.key
    text = key
  } else key = checkSpecialChars(status.key) ? '' : status.key

  let thisType = ''
  if (status.type === 'error') {
    thisType = 'danger' // to use with bootstrap
  } else thisType = checkSpecialChars(status.type) ? '' : status.type!
  const title = checkSpecialChars(status.title) ? '' : status.title
  const pluginName = status.pluginName
  return { title, type: thisType, key, text, pluginName }
}

export function iconBadgeReducer(state: BadgeStatus, action: IconBadgeReducerAction) {
  const { status } = action.payload

  const setStatus = setIconStatus(action.type, status)
  return setStatus

}
