'use strict'
import { NightwatchBrowser } from 'nightwatch'
import init from '../helpers/init'

module.exports = {
  '@disabled': true,
  before: function (browser: NightwatchBrowser, done: VoidFunction) {
    init(browser, done)
  },
  '@sources': function () {
    return sources
  },

  'Execute Simple Contract and Test Terminal #group1': function (browser: NightwatchBrowser) {
    browser.testContracts('Untitled.sol', sources[0]['Untitled.sol'], ['TestContract'])
      .clickLaunchIcon('udapp')
      .selectAccount('0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c') // this account will be used for this test suite
      .click('.udapp_contractActionsContainerSingle > button')
      .clickInstance(0)
      .clickFunction('f - transact (not payable)')
      .testFunction('last',
        {
          status: 'true Transaction mined and execution succeed',
          'decoded output': { 0: 'uint256: 8' }
        })
      .pause(500)
      .checkTerminalFilter('0x12332162e2e31397dc1e07ed0a1cf08f728e9b4487c6f9ed79d2f39410c92782', '')
      .clickFunction('g - transact (not payable)')
      .testFunction('last',
        {
          status: 'true Transaction mined and execution succeed',
          'decoded output': {
            0: 'uint256: 345',
            1: 'string: comment_comment_',
            2: 'bool: true',
            3: 'uint256: 4'
          }
        })
      .click('*[data-id="deployAndRunClearInstances"]')
  },

  'Test Complex Return Values #group1': function (browser: NightwatchBrowser) {
    browser.testContracts('returnValues.sol', sources[1]['returnValues.sol'], ['testReturnValues'])
      .clickLaunchIcon('udapp')
      .click('.udapp_contractActionsContainerSingle > button')
      .clickInstance(0)
      .clickFunction('retunValues1 - transact (not payable)')
      .testFunction('last',
        {
          status: 'true Transaction mined and execution succeed',
          'decoded output': {
            0: 'bool: _b true',
            1: 'uint256: _u 345',
            2: 'int256: _i -345',
            3: 'address: _a 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c'
          }
        })
      .clickFunction('retunValues2 - transact (not payable)')
      .testFunction('last',
        {
          status: 'true Transaction mined and execution succeed',
          'decoded output': {
            0: 'bytes1: _b 0x12',
            1: 'bytes2: _b2 0x1223',
            2: 'bytes3: _b3 0x000000',
            3: 'bytes: _blit 0x123498',
            4: 'bytes5: _b5 0x0432450000',
            5: 'bytes6: _b6 0x234553253200',
            6: 'string: _str this is a long string _ this is a long string _ this is a long string _ this is a long string _ this is a long string _ this is a long string _ this is a long string _ this is a long string _ this is a long string _ this is a long string _ this is a long string _ this is a long string _ this is a long string _ this is a long string _ this is a long string',
            7: 'bytes7: _b7 0x03252353253253',
            8: 'bytes22: _b22 0x32523523532532532523532500000000000000000000',
            9: 'bytes32: _b32 0x0325235325325235325235325235320000000000000000000000000000000000'
          }
        }).pause(500)
      .clickFunction('retunValues3 - transact (not payable)')
      .testFunction('last',
        {
          status: 'true Transaction mined and execution succeed',
          'decoded output': {
            0: 'uint8: _en 2',
            1: 'int256[5][]: _a1 1,-45,-78,56,60,-1,42,334,-45455,-446,1,10,-5435,45,-7'
          }
        }).click('*[data-id="deployAndRunClearInstances"]')
  },

  'Test Complex Input Values #group2': function (browser: NightwatchBrowser) {
    browser.testContracts('inputValues.sol', sources[2]['inputValues.sol'], ['test'])
      .clickLaunchIcon('udapp')
      .click('.udapp_contractActionsContainerSingle > button')
      .clickInstance(0)
      .clickFunction('inputValue1 - transact (not payable)', { types: 'uint256 _u, int256 _i, string _str', values: '"2343242", "-4324324", "string _ string _  string _  string _  string _  string _  string _  string _  string _  string _"' })
      .testFunction('last',
        {
          status: 'true Transaction mined and execution succeed',
          'decoded output': {
            0: 'uint256: _uret 2343242',
            1: 'int256: _iret -4324324',
            2: 'string: _strret string _ string _  string _  string _  string _  string _  string _  string _  string _  string _'
          }
        })
      .pause(500)
      .clickFunction('inputValue2 - transact (not payable)', { types: 'uint256[3] _n, bytes8[4] _b8', values: '[1,2,3], ["0x1234000000000000", "0x1234000000000000","0x1234000000000000","0x1234000000000000"]' })
      .testFunction('last', {
        status: 'true Transaction mined and execution succeed',
        'decoded output': {
          0: 'uint256[3]: _nret 1,2,3',
          1: 'bytes8[4]: _b8ret 0x1234000000000000,0x1234000000000000,0x1234000000000000,0x1234000000000000'
        },
        logs: [
          {
            from: '0xd9145CCE52D386f254917e481eB44e9943F39138',
            topic: '0xd30981760edbf605bda8689e945f622877f230c9a77cbfbd448aa4b7d8ac6e7f',
            event: 'event1',
            args: {
              0: '-123',
              1: '123',
              2: {
                _isIndexed: true,
                hash: '0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658'
              },
              3: '0x12340000',
              4: 'test _ test _ test _ test test _ test test _ test test _ test test _ test test _ test test _ test '
            }
          }
        ]
      })
      .click('*[data-id="deployAndRunClearInstances"]')
  },

  'Should Compile and Deploy a contract which has an event declaring a function as parameter #group2': function (browser: NightwatchBrowser) {
    browser.testContracts('eventFunctionInput.sol', sources[3]['eventFunctionInput.sol'], ['C'])
      .clickLaunchIcon('udapp')
      .selectAccount('0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c') // this account will be used for this test suite
      .click('.udapp_contractActionsContainerSingle > button')
      .clickInstance(0)
      .click('*[data-id="deployAndRunClearInstances"]')
  },

  'Should Compile and Deploy a contract which define a custom error, the error should be logged in the terminal #group3': function (browser: NightwatchBrowser) {
    browser.testContracts('customError.sol', sources[4]['customError.sol'], ['C'])
      .clickLaunchIcon('udapp')
      .selectAccount('0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c') // this account will be used for this test suite
      .click('.udapp_contractActionsContainerSingle > button')
      .clickInstance(0)
      .clickFunction('g - transact (not payable)')
      .pause(5000)
      .journalLastChildIncludes('Error provided by the contract:')
      .journalLastChildIncludes('CustomError : error description')
      .journalLastChildIncludes('Parameters:')
      .journalLastChildIncludes('"value": "2"')
      .journalLastChildIncludes('"value": "3"')
      .journalLastChildIncludes('"value": "error_string_2"')
      .journalLastChildIncludes('"documentation": "param1"')
      .journalLastChildIncludes('"documentation": "param2"')
      .journalLastChildIncludes('"documentation": "param3"')
      .journalLastChildIncludes('Debug the transaction to get more information.')
      .click('*[data-id="deployAndRunClearInstances"]')
  },

  'Should Compile and Deploy a contract which define a custom error, the error should be logged in the terminal , using London VM Fork #group3': function (browser: NightwatchBrowser) {
    browser
      .clickLaunchIcon('udapp')
      .clearTransactions()
      .click('*[data-id="settingsVMLondonMode"]') // switch to London fork
      .selectAccount('0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c') // this account will be used for this test suite
      .click('.udapp_contractActionsContainerSingle > button')
      .clickInstance(0)
      .clickFunction('g - transact (not payable)')
      .journalLastChildIncludes('Error provided by the contract:')
      .journalLastChildIncludes('CustomError : error description')
      .journalLastChildIncludes('Parameters:')
      .journalLastChildIncludes('"value": "2"')
      .journalLastChildIncludes('"value": "3"')
      .journalLastChildIncludes('"value": "error_string_2"')
      .journalLastChildIncludes('"documentation": "param1"')
      .journalLastChildIncludes('"documentation": "param2"')
      .journalLastChildIncludes('"documentation": "param3"')
      .journalLastChildIncludes('Debug the transaction to get more information.')
  },

  'Should Compile and Deploy a contract which define a custom error in a library, the error should be logged in the terminal #group3': function (browser: NightwatchBrowser) {
    browser.testContracts('customErrorLib.sol', sources[5]['customErrorLib.sol'], ['D'])
      .clickLaunchIcon('udapp')
      .click('.udapp_contractActionsContainerSingle > button')
      .clickInstance(1)
      .clickFunction('h - transact (not payable)')
      .pause(5000)
      .journalLastChildIncludes('Error provided by the contract:')
      .journalLastChildIncludes('CustomError : error description from library')
      .journalLastChildIncludes('Parameters:')
      .journalLastChildIncludes('"value": "48"')
      .journalLastChildIncludes('"value": "46"')
      .journalLastChildIncludes('"value": "error_string_from_library"')
      .journalLastChildIncludes('"documentation": "param1 from library"')
      .journalLastChildIncludes('"documentation": "param2 from library"')
      .journalLastChildIncludes('"documentation": "param3 from library"')
      .journalLastChildIncludes('Debug the transaction to get more information.')
  },

  'Should compile and deploy 2 simple contracts, the contract creation component state should be correctly reset for the deployment of the second contract #group4': function (browser: NightwatchBrowser) {
    browser
      .addFile('Storage.sol', sources[6]['Storage.sol'])
      .addFile('Owner.sol', sources[6]['Owner.sol'])
      .clickLaunchIcon('udapp')
      .createContract('42, 24')
      .openFile('Storage.sol')
      .clickLaunchIcon('udapp')
      .createContract('102') // this creation will fail if the component hasn't been properly reset.
      .clickInstance(1)
      .clickFunction('store - transact (not payable)', { types: 'uint256 num', values: '24' })
      .testFunction('last', // we check if the contract is actually reachable.
        {
          status: 'true Transaction mined and execution succeed',
          'decoded input': {
            'uint256 num': '24'
          }
        })
      .end()
  }
}

// @TODO test: bytes8[3][] type as input

const sources = [
  {
    'Untitled.sol': {
      content: `
      contract TestContract { function f() public returns (uint) { return 8; }
      function g() public returns (uint, string memory, bool, uint) {
        uint payment = 345;
        bool payed = true;
        string memory comment = "comment_comment_";
        uint month = 4;
        return (payment, comment, payed, month); } }`
    }
  },
  {
    'returnValues.sol': {
      content: `
  contract testReturnValues {
    enum ActionChoices { GoLeft, GoRight, GoStraight, SitStill }
    function retunValues1 () public returns (bool _b, uint _u, int _i, address _a)  {
        _b = true;
        _u = 345;
        _i = -345;
        _a = msg.sender;
    }

    function retunValues2 () public returns (bytes1 _b, bytes2 _b2, bytes3 _b3, bytes memory _blit, bytes5 _b5, bytes6 _b6, string memory _str, bytes7 _b7, bytes22 _b22, bytes32 _b32)  {
        _b = 0x12;
        _b2 = 0x1223;
        _b5 = hex"043245";
        _b6 = hex"2345532532";
        _b7 = hex"03252353253253";
        _b22 = hex"325235235325325325235325";
        _b32 = hex"032523532532523532523532523532";
        _blit = hex"123498";
        _str = "this is a long string _ this is a long string _ this is a long string _ this is a long string _ this is a long string _ this is a long string _ this is a long string _ this is a long string _ this is a long string _ this is a long string _ this is a long string _ this is a long string _ this is a long string _ this is a long string _ this is a long string";
    }

    function retunValues3 () public returns (ActionChoices _en, int[5][] memory _a1)  {
       _en = ActionChoices.GoStraight;
       int[5][] memory a = new int[5][](3);
       a[0] = [int(1),-45,-78,56,60];
       a[1] = [int(-1),42,334,-45455,-446];
       a[2] = [int(1),10,-5435,45,-7];
      _a1 = a;
    }
  }`
    }
  },
  {
    'inputValues.sol': {
      content: `
  contract test {
    event event1(int _i, uint indexed _u, string indexed _str, bytes4 _b, string _notIndexed);
    function inputValue1 (uint _u, int _i, string memory _str) public returns (uint _uret, int _iret, string memory _strret) {
      _uret = _u;
      _iret = _i;
      _strret = _str;
    }
    function inputValue2 (uint[3] memory _n, bytes8[4] memory _b8) public returns (uint[3] memory _nret, bytes8[4] memory _b8ret){
        _nret = _n;
        _b8ret = _b8;
        emit event1(-123, 123, "test", hex"1234", "test _ test _ test _ test test _ test test _ test test _ test test _ test test _ test test _ test ");
    }
}`
    }
  },
  // https://github.com/ethereum/remix-project/issues/404
  {
    'eventFunctionInput.sol': {
      content: `
pragma solidity >= 0.7.0;
contract C {
    event Test(function() external);
}`
    }
  },
  // https://github.com/ethereum/remix-project/issues/1152
  {
    'customError.sol': {
      content: `// SPDX-License-Identifier: GPL-3.0

      pragma solidity ^0.8.7;
      
      /// error description
      /// @param a param1
      /// @param b param2
      /// @param c param3
      error CustomError(uint a, uint b, string c);
      contract C {
          function f() public pure {
              revert CustomError(2, 3, "error_string");
          }
          function g() public {
              revert CustomError(2, 3, "error_string_2");
          }          
      }`
    }
  },
  {
    'customErrorLib.sol': {
      content: `// SPDX-License-Identifier: GPL-3.0

      pragma solidity ^0.8.7;
      
      library lib {
          /// error description from library
          /// @param a param1 from library
          /// @param b param2 from library
          /// @param c param3 from library
          error CustomError(uint a, uint b, string c);
          function set() public {
              revert CustomError(48, 46, "error_string_from_library");
          }      
      }      
      
      contract D {
          function h() public {
              lib.set();
          }      
      }`
    }
  },
  {
    'Owner.sol': {
      content: `
      // SPDX-License-Identifier: GPL-3.0

      pragma solidity >=0.7.0 <0.9.0;

      /**
       * @title Owner
       * @dev Set & change owner
       */
      contract Owner {

          address private owner;
          
          // event for EVM logging
          event OwnerSet(address indexed oldOwner, address indexed newOwner);
          
          // modifier to check if caller is owner
          modifier isOwner() {
              // If the first argument of 'require' evaluates to 'false', execution terminates and all
              // changes to the state and to Ether balances are reverted.
              // This used to consume all gas in old EVM versions, but not anymore.
              // It is often a good idea to use 'require' to check if functions are called correctly.
              // As a second argument, you can also provide an explanation about what went wrong.
              require(msg.sender == owner, "Caller is not owner");
              _;
          }
          
          /**
           * @dev Set contract deployer as owner
           */
          constructor(uint p, uint o) {
              owner = msg.sender; // 'msg.sender' is sender of current call, contract deployer for a constructor
              emit OwnerSet(address(0), owner);
          }

          /**
           * @dev Change owner
           * @param newOwner address of new owner
           */
          function changeOwner(address newOwner) public isOwner {
              emit OwnerSet(owner, newOwner);
              owner = newOwner;
          }

          /**
           * @dev Return owner address 
           * @return address of owner
           */
          function getOwner() external view returns (address) {
              return owner;
          }
      }`
    },
    'Storage.sol': {
      content: `
      // SPDX-License-Identifier: GPL-3.0

      pragma solidity >=0.7.0 <0.9.0;

      /**
       * @title Storage
       * @dev Store & retrieve value in a variable
       */
      contract Storage {

          uint256 number;

          constructor(uint p) {

          }

          /**
           * @dev Store value in variable
           * @param num value to store
           */
          function store(uint256 num) public {
              number = num;
          }

          /**
           * @dev Return value 
           * @return value of 'number'
           */
          function retrieve() public view returns (uint256){
              return number;
          }
      }`
    }
  }
]
