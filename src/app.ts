import dotenv from 'dotenv'
dotenv.config()
import { checkTokenPair, Token } from './price-checker'


const ETH: Token = {
    symbol: "ETH", contractAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
}

const MKR: Token = {
    symbol: "MKR", contractAddress: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2"
}

function start() {
    checkTokenPair(ETH, MKR)
}

start();
