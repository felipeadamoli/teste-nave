$(document).ready(function(){

    const arrayTweets = $.get("https://api-nave-twitter.herokuapp.com/tweets");
    const btnNewTweet = $("#newTweet");
    const btnSort = $("#sortTweets");
    const containerTweets = $("#tweetsContainer");

    class tweet {
        constructor(name, text) {
            this.text = text;
            this.name = name;
        }
        exibeTweet() {
            containerTweets.append('<p class="nomeUser">'+ this.name +'</p>');
            containerTweets.append('<p class="textoUser">'+ this.text +'</p>');
        }
    }

    
    arrayTweets.done(function(data){
        createTweets(data);
    });

    btnSort.click(function(){
        event.preventDefault();
        arrayTweets.done(function(data){
            data = data.sort(compare);
            containerTweets.empty();
            createTweets(data);
        });
    });

    btnNewTweet.click(function(){
        var text = $("#textTweet").val();
        $.post( "https://api-nave-twitter.herokuapp.com/tweets", { userId: 1, text: text } );
    });


    function createTweets(data) {
        var tweets_ready = [];
        var tam = data.length;
        for(i=0;i<tam;i++){
            tweets_ready.push(new tweet(data[i].name,data[i].text));
            tweets_ready[i].exibeTweet();
        }
        return tweets_ready;
    }

    function compare(a,b) {
      if (a.text.toLowerCase() < b.text.toLowerCase()) return -1;
      if (a.text.toLowerCase() > b.text.toLowerCase()) return 1;
      return 0;
    }

});