var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var exphbs  = require('express-handlebars');
// Connection URL
var url = 'mongodb://localhost:27017/admin?readPreference=primary';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
    console.log("Connected to mongoDB", err);
    var collection = db.collection('gameresults');
    var app = express()
    app.engine('handlebars', exphbs({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');
    app.use(express.static('files'));

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
            }else if(player==="scissors"){
                return "You are a big looser, I picked rock.";
            } else {
                return "You are a cheater, " + player + " is not allowed.";
            }
        }else if(server==="paper"){
            if(player === "rock"){
                return "You are a big looser, I picked paper.";
                
            }else if(player === "paper"){
                return "It's a draw, we both picker paper.";
            }else if(player==="scissors"){
                return "You win, I picked paper.";
            } else {
                return "You are a cheater, " + player + " is not allowed.";
            }
        }else {
            if(player === "rock"){
                return "You win, I picked scissors.";           
            }else if(player === "paper"){
                return "You are a big looser, I picked scissors.";
            }else if(player==="scissors"){
                return "It's a draw, we both picker scissors.";
            } else {
                return "You are a cheater, " + player + " is not allowed.";
            }
        }
    }

    app.get('/', function (req, res) {
        res.render('home',{userName:"Christophe"});
    });

    app.get('/game/:playerchoice/', function (req, res) {
        var serverPick = randomPick(),
            playerPick = req.params.playerchoice;

        collection.insert({player:playerPick,computer:serverPick,playerName :"Christophe"},function(err,result){
            
            res.render("game",{
                serverChoice: serverPick,
                playerChoice : playerPick,
                gameResult:confrontation(serverPick,playerPick)
            });
        });        
    });

    app.get("/statistics",function(req,res){
        collection.find({}).toArray(function(err, docs) {
            res.send(docs.length+" games have been played." );
        });
    });

    app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
    })
  // Find some documents
  
});


