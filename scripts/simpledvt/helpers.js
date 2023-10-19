const { assert } = require('chai')
const { log } = require('../helpers/log')

const KERNEL_APP_BASES_NAMESPACE = '0xf1f3eb40f5bc1ad1344716ced8b8a0431d840b5783aea1fd01786bc26f35ac0f'

const MANAGE_SIGNING_KEYS = '0x75abc64490e17b40ea1e66691c3eb493647b24430b358bd87ec3e5127f1621ee'
const MANAGE_NODE_OPERATOR_ROLE = '0x78523850fdd761612f46e844cf5a16bda6b3151d6ae961fd7e8e7b92bfbca7f8'
const SET_NODE_OPERATOR_LIMIT_ROLE = '0x07b39e0faf2521001ae4e58cb9ffd3840a63e205d288dc9c93c3774f0d794754'
const STAKING_ROUTER_ROLE = '0xbb75b874360e0bfd87f964eadd8276d8efb7c942134fc329b513032d0803e0c6'
const STAKING_MODULE_MANAGE_ROLE = '0x3105bcbf19d4417b73ae0e58d508a65ecf75665e46c2622d8521732de6080c48'
const REQUEST_BURN_SHARES_ROLE = '0x4be29e0e4eb91f98f709d98803cba271592782e293b84a625e025cbb40197ba8'
const SIMPLE_DVT_IPFS_CID = 'QmaSSujHCGcnFuetAPGwVW5BegaMBvn5SCsgi3LSfvraSo'

async function getDeployer(web3, defaultDeployer) {
  if (!defaultDeployer) {
    const [firstAccount] = await web3.eth.getAccounts()
    return firstAccount
  }
  return defaultDeployer
}

function readStateAppAddress(state, app = '') {
  const appState = state[app]
  // goerli/mainnet deployed.json formats compatibility
  return appState.proxyAddress || (appState.proxy && appState.proxy.address) || appState.address
}

function getSignature(instance, method) {
  const methodAbi = instance.contract._jsonInterface.find((i) => i.name === method)
  if (!methodAbi) {
    throw new Error(`Method ${method} not found in contract`)
  }
  return methodAbi.signature
}

function _checkEq(a, b, descr = '') {
  assert.equal(a, b, descr)
  log.success(descr)
}

module.exports = {
  readStateAppAddress,
  getDeployer,
  getSignature,
  _checkEq,
  KERNEL_APP_BASES_NAMESPACE,
  MANAGE_SIGNING_KEYS,
  MANAGE_NODE_OPERATOR_ROLE,
  SET_NODE_OPERATOR_LIMIT_ROLE,
  STAKING_ROUTER_ROLE,
  STAKING_MODULE_MANAGE_ROLE,
  REQUEST_BURN_SHARES_ROLE,
  SIMPLE_DVT_IPFS_CID,
}
