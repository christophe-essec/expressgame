var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello, are you ready to play !')
})

var listChoices = ["rock","paper","scissors"];
function randomPick(){
    return listChoices[parseInt(Math.random()*3)];
}

function confrontation(server, player){
    if(server==="rock"){
        if(player === "rock"){
            return "It's a draw, we both picker rock.";
        }else if(player === "paper"){
            return "You win, I picked rock.";
        }else{
            return "You are a big looser, I picked rock.";
        }
    }else if(server==="paper"){
        if(player === "rock"){
            return "You are a big looser, I picked paper.";
            
        }else if(player === "paper"){
            return "It's a draw, we both picker paper.";
        }else{
            return "You win, I picked paper.";
        }
    }else {
        if(player === "rock"){
            return "You win, I picked scissors.";           
        }else if(player === "paper"){
            return "You are a big looser, I picked scissors.";
        }else{
            return "It's a draw, we both picker scissors.";
        }
    }
}

app.get('/rock/', function (req, res) {
    var serverPick = randomPick(),
        playerPick = "rock"
    res.send(confrontation(serverPick,playerPick));
})

app.get('/paper/', function (req, res) {
      var serverPick = randomPick(),
        playerPick = "paper"
    res.send(confrontation(serverPick,playerPick));
})

app.get('/scissors/', function (req, res) {
      var serverPick = randomPick(),
        playerPick = "scissors"
    res.send(confrontation(serverPick,playerPick));
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})