import utils from 'web3-utils'
import moment from 'moment-timezone'
import kyberRateContract from './networks/kyber'
import uniswap from './networks/uniswap'

export interface CheckPairResult {
    uniswapResult: any
    kyberResult: any
}


export interface Token {
    symbol: string
    /**
     * You can find the token address by searching it on https://etherscan.io/tokens
     */
    contractAddress: string
}


export async function checkTokenPair(input: Token, output: Token, amount: number = 1): Promise<CheckPairResult> {
    const inputAmount = utils.toWei(`${amount}`, 'ether')
    const { symbol: inputTokenSymbol, contractAddress: inputTokenAddress } = input
    const { symbol: outputTokenSymbol, contractAddress: outputTokenAddress } = output

    const exchangeContract = await uniswap.createExchangeContract(outputTokenAddress);
    const uniswapResult = await exchangeContract.methods.getEthToTokenInputPrice(inputAmount).call()
    let kyberResult = await kyberRateContract.methods.getExpectedRate(inputTokenAddress, outputTokenAddress, inputAmount, true).call()

    console.table([{
        'Input Token': inputTokenSymbol,
        'Output Token': outputTokenSymbol,
        'Input Amount': utils.fromWei(inputAmount, 'ether'),
        'Uniswap Return': utils.fromWei(uniswapResult, 'ether'),
        'Kyber Expected Rate': utils.fromWei(kyberResult.expectedRate, 'ether'),
        'Kyber Min Return': utils.fromWei(kyberResult.slippageRate, 'ether'),
        'Timestamp': moment().tz('America/Chicago').format(),
    }])
    return { uniswapResult, kyberResult }
}
