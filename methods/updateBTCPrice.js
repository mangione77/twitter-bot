const axios = require('axios')
const config = {
	'headers':{'X-Testing':'testing'}
}

let baseURL1 = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/all?crypto=BTC&fiat=EUR'
let baseURL2 =  'https://api.coindesk.com/v1/bpi/currentprice.json'

const getPrices = {}

getPrices.BitcoinAverage = () => {
	return new Promise((resolve,reject) => {
		axios.get(baseURL1,config)
			.then(response => {
				resolve(response.data.BTCEUR.last)
			})
			.catch(console.error)		
	})

}


getPrices.Coindesk = () => {
	return new Promise((resolve,reject) => {
		axios.get(baseURL2)
			.then(response => {
				resolve(response.data.bpi.EUR.rate_float)
			})	
	})
	
}

module.exports = getPrices
