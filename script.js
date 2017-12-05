$(document).ready(function(){
    $.get("https://api-nave-twitter.herokuapp.com/tweets", function(data){
        event.preventDefault();
        var tam = data.length;
        printTweet(data,tam);
    });

  
    $("#newTweet").click(function(){
        var text = $("#textTweet").val();
        $.post( "https://api-nave-twitter.herokuapp.com/tweets", { userId: 1, text: text } );
    });
    $("#sortTweets").click(function(){
        event.preventDefault();
        console.log("entrou");
            $.get("https://api-nave-twitter.herokuapp.com/tweets", function(data){

            var tam = data.length;
            data = data.sort(compare);
            $("#tweetsContainer").empty();
            printTweet(data,tam);
        });
    });
    
    function printTweet(data, tam) {
        for(i=0;i<tam;i++){
            $("#tweetsContainer").append('<p class="nomeUser">'+ data[i].name +'</p>');
            $("#tweetsContainer").append('<p class="textoUser">'+ data[i].text +'</p>');
        }
    }

    function compare(a,b) {
      if (a.text < b.text) return -1;
      if (a.text > b.text) return 1;
      return 0;
    }


});