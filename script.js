class Tweet {
    constructor(props) {
        this.name = props.username
        this.text = props.text
    }

    render() {
        return `<li><span class="nomeUser">${this.name}</span><p class="textoUser">${this.text}</p></li>`
    }
}

class TweetsList {
    constructor(props) {
        this.element = document.getElementById(props.container)
    }

    render() {
        fetch('https://twitter-nave-api.herokuapp.com/tweets')
            .then(response => {
                response.json().then((data) => {
                    let result = data.map((t) => {
                        const tweet = new Tweet(t)
                        return tweet.render()
                    })
                    result.forEach(el => this.element.innerHTML += el)
                })
            })
            .catch(error => console.log(error))               
    }
}

class SendTweet {
    constructor(props) {
        this.form = document.getElementById(props.form)
        this.textArea = document.getElementById('textTweet')
        this.tweetList = document.getElementById(props.tweetsContainer)
        this.bind()
    }

    bind() {
        this.form.onsubmit = this.onSubmit.bind(this)
        this.add = this.add.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()
        const text = this.textArea.value
        if(text)
            this.add(text)
    }

    add(text) {
        fetch('https://twitter-nave-api.herokuapp.com/tweets', {
            body: JSON.stringify({ text }),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain, */*'
            }
        })
        .then(response => {
            response.json().then((data) => {
                const tweet = new Tweet(data)
                this.tweetList.innerHTML += tweet.render()
                this.textArea.value = ''
            })
        })
        .catch(error => reject(error))
        
    }
}

const tweetsList = new TweetsList({
    container: 'tweet-list'
})

const sendTweet = new SendTweet({
    form: 'form-tweet',
    tweetsContainer: 'tweet-list'
})   

tweetsList.render()            