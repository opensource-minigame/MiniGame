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
    res.sendFile(__dirname + "/mineweep/tetris.html")
});

///////////////////////////////////////////////////////////////
app.post('/input_post', (req,res)=>{
    let PersonName = req.body.PersonName;
    let PersonID = req.body.PersonID;
    let Majority = req.body.Majority;

    var query = 'select * from Persons';
    conn.query(query, function(err, rows, fields){
        if(err){console.log('FILE READ FAILED!')}
        else{
            var query = conn.query('insert into Persons (PersonID, PersonName, Majority) values ("'+PersonID+'","'+PersonName+'","'+Majority+'")', 
            function(err, rows, fields){
                if(err){throw err;}
                else{
                    console.log("Insert Complete!")
                }
            });
            var query = conn.query('select * from Persons')
            console.log(query)
        }
    });
    res.sendFile("<h1>성공하였습니다!</h1>")
    conn.end();
});