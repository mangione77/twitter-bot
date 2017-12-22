require('dotenv').config()
const twit = require('twit')
const Twitter = new twit({
	consumer_key:process.env.CONSUMER_KEY,
	consumer_secret:process.env.CONSUMER_SECRET,
	access_token:process.env.ACCESS_TOKEN,
	access_token_secret:process.env.ACCESS_TOKEN_SECRET
})

// TODO: Add logic to avoid repeat follows and strange behaviour

followAccs = () => {
		Twitter.get('users/search', { q: 'criptomonedas' }, (err,data,response) => {
			if (err)
				console.log('Error in GET USERS', err)

			if (response)
				data.map(tweet => {
					let userID = tweet.id
					let userName = tweet.name
					Twitter.post('friendships/create', { id:userID, follow:true }, (err,data,response) => {
						if (err)
							console.log('Error in FOLLOW USERS', err)

						if (response)
							console.log('Followed user ', userName)
					})
				})
		})
	}

followAccs()