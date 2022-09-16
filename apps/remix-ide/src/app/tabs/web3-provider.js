import { Plugin } from '@remixproject/engine'
import * as packageJson from '../../../../../package.json'

export const profile = {
  name: 'web3Provider',
  displayName: 'Global Web3 Provider',
  description: 'Represent the current web3 provider used by the app at global scope',
  methods: ['sendAsync'],
  version: packageJson.version,
  kind: 'provider'
}

export class Web3ProviderModule extends Plugin {
  constructor (blockchain) {
    super(profile)
    this.blockchain = blockchain
  }

  /*
    that is used by plugins to call the current ethereum provider.
    Should be taken carefully and probably not be release as it is now.
  */
  sendAsync (payload) {
    return new Promise((resolve, reject) => {
      const provider = this.blockchain.web3().currentProvider
      // see https://github.com/ethereum/web3.js/pull/1018/files#diff-d25786686c1053b786cc2626dc6e048675050593c0ebaafbf0814e1996f22022R129
      provider[provider.sendAsync ? 'sendAsync' : 'send'](payload, (error, message) => {
        if (error) return reject(error)
        resolve(message)
      })
    })
  }
}
