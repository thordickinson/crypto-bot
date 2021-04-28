import Web3 from 'web3'
import {cleanEnv, url} from 'envalid'


const env = cleanEnv(process.env, {
    RPC_URL : url({desc: "You need to setup the RPC url, go to https://infura.io and create a new app to get an url."})
})

const web3 = new Web3(env.RPC_URL)
export default web3
