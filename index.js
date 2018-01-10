const process = require('process')
const twitter = require('twitter')

// load the .env files variables
require('dotenv').config()

const twitterConf = {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
}
const twitterApi = new twitter(twitterConf)

// CONSTANTS
const interval = 5*60*1000
const usernameToSendTo = process.env.USERNAME_TO_SEND_TO
const pathToPost = 'statuses/update'

const messageList = [
    `pocoyo pocoyo ! @${usernameToSendTo}`,
    `Hola ! @${usernameToSendTo}`,
    `Mademoiselle ... ! @${usernameToSendTo}`,
]

/**
 *  Select a random message from messageList
 *
 * @returns {string} - Return a message randomly selected
 */
const selectRandomMessages = () => {
    const randomIndex = Math.floor(Math.random() * messageList.length)

    return messageList[randomIndex]
}

/**
 * Send the randomly selected message
 */
const sendMessage = () => {
    const tweetParams = {
        status: selectRandomMessages(),
    }

    twitterApi.post(pathToPost, tweetParams, (err) => {
        if (err) {
            console.log('Error: ', err.message)
        }
    })
}

/**
 * Pocoyo start function
 *
 * we assure that as the start Pocoyo send a message
 */
const start = () => {
    sendMessage()
    setInterval(sendMessage, interval)
}

// Starting Pocoyo
start()