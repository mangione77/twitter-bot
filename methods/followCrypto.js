require('dotenv').config()
const twit = require('twit')
const Twitter = new twit({
	consumer_key:process.env.CONSUMER_KEY,
	consumer_secret:process.env.CONSUMER_SECRET,
	access_token:process.env.ACCESS_TOKEN,
	access_token_secret:process.env.ACCESS_TOKEN_SECRET
})

const follow = {}

follow.followCrypto = () => {
	let stream = Twitter.stream('statuses/filter', { track: 'bitcoin', language:'es' })

	stream.on('tweet',tweet => {
		console.log(tweet)
	})
}

module.exports = follow 