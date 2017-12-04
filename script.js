$(document).ready(function(){
            $.get("https://api-nave-twitter.herokuapp.com/tweets", function(data){
                var tam = data.length;
                for(i=0;i<tam;i++){
                    $("#divPrincipal").append('<p class="nomeUser">'+ data[i].name +'</p>');
                    $("#divPrincipal").append('<p class="textoUser">'+ data[i].text +'</p>');
                }
            });
            $("button").click(function(){
                var text = $("#textTweet").val();
                $.post( "https://api-nave-twitter.herokuapp.com/tweets", { userId: 1, text: text } );
            });
            
    });