const updateBTCPrice = require('./methods/updateBTCPrice')
const formatCurrency = require('format-currency')
const twit = require('twit')
const Twitter = new twit({
	consumer_key:process.env.CONSUMER_KEY,
	consumer_secret:process.env.CONSUMER_SECRET,
	access_token:process.env.ACCESS_TOKEN,
	access_token_secret:process.env.ACCESS_TOKEN_SECRET
})

let price1
let price2
let avg
let opts = { format: '%s%v', locale: 'es-ES' }
let message = 'El precio del Bitcoin: '
let hashtags = ['#bitcoin','#elpreciodelbtc','#criptomonedas']

updateBTCPrice.BitcoinAverage()
	.then(data => {
		price1 = parseFloat(data)
		updateBTCPrice.Coindesk()
			.then(data => {
				price2 = parseFloat(data)
				avg = formatCurrency(((price1+price2)/2).toFixed(2))
				let tweet = message+avg+'€ '+hashtags.join(" ")
				Twitter.post('statuses/update', { status: tweet }, (err, data, response) => {
					if (err) console.log(err)

					if (response)
						console.log('Tweet created! ==> ' + tweet + 'at: ' + new Date())
				})
				
			})
			.catch(console.error)
	})
	.catch(console.error)


