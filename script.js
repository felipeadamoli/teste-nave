class Tweet {
    constructor(props) {
        this.name = props.name;
        this.text = props.text;
    }

    render() {
        return `<li><span class="nomeUser">${this.name}</span><p class="textoUser">${this.text}</p></li>`;
    }
}

class TweetsList {
    constructor(props) {
        this.$element = $(props.container);
    }

    render() {
        $.get('https://api-nave-twitter.herokuapp.com/tweets', (data) => {
            let result = data.map((t) => {
                const tweet = new Tweet(t);
                return tweet.render();
            })
            this.$element.append(result);
        });                
    }
}

class SendTweet {
    constructor(props) {
        this.form = props.form,
        this.tweetList = $(props.tweetsContainer)
        this.bind();
    }

    bind() {
        this.form.submit(this.onSubmit.bind(this))
    }

    onSubmit(e) {
        e.preventDefault();
        this.text = $("#textTweet").val();
        if(this.text)
            this.add();
    }

    add() {
        $.post( "https://api-nave-twitter.herokuapp.com/tweets", { userId: 1, text: this.text }).done(data => {
            const tweet = new Tweet(data);
            this.tweetList.append(tweet.render());
            $("#textTweet").val('');
        });
        
    }
}

$(document).ready(() => {
    const tweetsList = new TweetsList({
        container: '#tweetsContainer'
    });
    
    const sendTweet = new SendTweet({
        form: $("#form-tweet"),
        tweetsContainer: '#tweetsContainer'
    })   
    
    tweetsList.render();            
}); 