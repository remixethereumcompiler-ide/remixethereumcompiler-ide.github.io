# Remix Libraries

[![Join the chat at https://gitter.im/ethereum/remix](https://badges.gitter.im/ethereum/remix.svg)](https://gitter.im/ethereum/remix?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![CircleCI](https://circleci.com/gh/ethereum/remix-project/tree/master.svg?style=svg)](https://circleci.com/gh/ethereum/remix-project/tree/master)
[![Documentation Status](https://readthedocs.org/projects/docs/badge/?version=latest)](https://remix-ide.readthedocs.io/en/latest/index.html)


**Remix libraries** are part of the Remix Project and provide tools that help smart contract development, compilation, testing & deployment. These tools also work as a core of native plugins of **Remix IDE**.

**Remix IDE** is an open source web and desktop application. It fosters a fast development cycle and has a rich set of plugins with intuitive GUIs. Remix is used for the entire journey of contract development as well as being a playground for learning and teaching Ethereum. 

The Remix IDE repository is specifically available **[here](https://github.com/ethereum/remix-project/tree/master/apps/remix-ide)**, and an online version is available at https://remix.ethereum.org.

To start with Remix IDE, check out [official documentation](https://remix-ide.readthedocs.io/en/latest/index.html).

Here is the brief description of Remix libraries.

+ [`remix-analyzer`](remix-analyzer/README.md): Perform static analysis on Solidity smart contracts to check security vulnerabilities and bad development practices
+ [`remix-astwalker`](remix-tests/README.md): Parse solidity AST (Abstract Syntax Tree)
+ [`remix-debug`](remix-debug/README.md): Debug Ethereum transactions. It provides several controls that allow stepping over the trace and seeing the current state of a selected step.
+ [`remix-simulator`](remix-simulator/README.md): Web3 wrapper for different kind of providers
+ [`remix-solidity`](remix-solidity/README.md): Load a Solidity compiler from provided URL and compile the contract using loaded compiler and return the compilation details
+ [`remix-lib`](remix-lib/README.md): Common place for libraries being used across multiple modules
+ [`remix-tests`](remix-tests/README.md): Unit test Solidity smart contracts. It works as a plugin & as CLI both
+ [`remix-url-resolver`](remix-url-resolver/README.md): Provide helpers for resolving the content from external URL ( including github, swarm, ipfs etc.).
+ [`remixd`](remixd/README.md): Allow accessing local filesystem from Remix IDE by running a daemon

Each library is an NPM package and has basic documentation about its usage in its own `README`.

## Contributing

Everyone is very welcome to contribute on Remix Project. Suggestions, issues, queries and feedbacks are our pleasure. Please reach us on [Gitter](https://gitter.im/ethereum/remix) in case of any query.

For more information on the contributing in code, see our [contribution guidelines](https://github.com/ethereum/remix-project/blob/master/CONTRIBUTING.md).


