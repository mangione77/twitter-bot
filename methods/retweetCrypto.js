require('dotenv').config()
const twit = require('twit')
const Twitter = new twit({
	consumer_key:process.env.CONSUMER_KEY,
	consumer_secret:process.env.CONSUMER_SECRET,
	access_token:process.env.ACCESS_TOKEN,
	access_token_secret:process.env.ACCESS_TOKEN_SECRET
})

const retweet = {}

retweet.retweetCrypto = () => {
	let params = {
		q:'#criptomonedas, #Criptomonedas',
		lang:'es',
		result_type:'recent'
	}

	Twitter.get('search/tweets', params, (err,data,response) => {
		if (err) throw new Error

		if (response) {
			data.statuses.map(status => {
			let ID = status.id_str
			Twitter.post('statuses/retweet/:id', {
					id:ID
				}, (err, data, response) => {
					if (err) throw console.log(err)

					if (response)
						console.log('retweeted!')
				})
			})


		}
		else {
			console.log('Something went wrong with your search')
		}
	})
}

module.exports = retweet