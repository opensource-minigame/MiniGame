
var express = require('express')
var app = express()
var mysql = require('mysql')
var bodyParser = require('body-parser')


app.listen(3000, function(){
    console.log("start !! express")
});


var conn = mysql.createConnection({
    host : 'dbtest.cb2oddxh6bnw.ap-northeast-2.rds.amazonaws.com',
    user : 'admin',
    password : 'qwer1234',
    database : 'dbtest',
    port : 3306
});

app.use(express.static('./'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

conn.connect(function(err){
    if(err){console.log(err)}
    else{
        console.log('DB connection is successed');
    }
});



app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/a1.html")
});

app.get('/mineweeper1.html',function(req,res){
    res.sendFile(__dirname + "/mineweeper1.html")
});

app.get('/tetris', function(req,res){
    res.sendFile(__dirname + "/tetris.html")
});

app.post('/input_post', (req,res)=>{
    
    let PersonName = req.body.PersonName;
    let PersonID = req.body.PersonID;
    let Majority = req.body.Majority;
    let Score = req.body.Score;
    let Game = req.body.Game;
/*
    $(function(){
        conn.query('SELECT * FROM Persons', function(err, rows, fields){
            if(err) console.log(err);
            else{
                for(let i=0; i<rows.length; i++){
                    let a = i+" PersonsID: " + rows[i].PersonID+", "+"Name : "+ rows[i].PersonName+", 학과 : "+rows[i].Majority;
                    $('<tr><td>'+rows[i].PersonID+'</td><td>'+rows[i].PersonName+'</td><td>'+rows[i].Majority+'</td></tr>').appendTo(".table1>tbody")
                }

            }
        })
    })*/
    

    var query = conn.query('insert into MiniGame (PersonID, PersonName, Majority,Score,Game) values ("'+PersonID+'","'+PersonName+'","'+Majority+'","'+Score+'","'+Game+'")', 
    function(err){
        if(err){throw err;}
        else{
            console.log("Insert Complete!")
        }
    });
    
    conn.query('SELECT * FROM MiniGame where Game like \''+ Game +"\' Order by Score DESC", function(err, rows, fields){
        let a =''
        if(err) console.log(err,rows);
        else{
            a = a + '<table><tr><td>순위  </td><td>학번</td><td>이름  </td><td>학과  </td><td>점수  </td><td>게임명  </td></tr>'
            
            for(let i=0; i<rows.length; i++){
                a += '<tr><td>'+(i+1)+'</td><td>'+rows[i].PersonID+"</td><td>"+rows[i].PersonName+"</td><td>"+rows[i].Majority+"</td><td>"+rows[i].Score+"</td><td>"+rows[i].Game+'</td></tr>'
            }
            a += '</table>'
            res.send(a)
        }
    })
    // conn.end();
}); 
