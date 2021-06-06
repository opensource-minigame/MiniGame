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
/*
app.get('/inputtext.html',function(req,res){
    conn.query('SELECT * FROM Persons', function(err, rows, fields){
        if(err) console.log(err,rows);
        else{
            for(let i=0; i<rows.length; i++){
                console.log(i+" PersonsID: " + rows[i].PersonID+", "+"Name : "+ rows[i].PersonName+", 학과 : "+rows[i].Majority);
            }
        }
    })
})*/
///////////////////////////////////////////////////////////////

app.post('/input_post', (req,res)=>{
    
    let PersonName = req.body.PersonName;
    let PersonID = req.body.PersonID;
    let Majority = req.body.Majority;
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
    /*
    conn.query(query, function(err){
        if(err){console.log('FILE READ FAILED!')}
        else{
            var query = conn.query('insert into Persons (PersonID, PersonName, Majority) values ("'+PersonID+'","'+PersonName+'","'+Majority+'")', 
            function(err){
                if(err){throw err;}
                else{
                    console.log("Insert Complete!")
                }
            });
            console.log(query)
        }
    });*/
    //res.sendFile(__dirname+"/sField.html");
    //res.sendFile(__dirname+"/inputtext.html")
    conn.query('SELECT * FROM Persons ORDER BY PersonID DESC', function(err, rows, fields){
        let a =''
        if(err) console.log(err,rows);
        else{
            a = a + '<table>'
            for(let i=0; i<rows.length; i++){
                //a += i+" PersonsID: " + rows[i].PersonID+", "+"Name : "+ rows[i].PersonName+", 학과 : "+rows[i].Majority+'<br>';
                a += '<tr><td>'+i+'</td><td>'+rows[i].PersonID+"</td><td>"+rows[i].PersonName+"</td><td>"+rows[i].Majority+"</td></tr>"
            }
            a += '</table>'
            res.send(a)
        }
    })


    conn.end();
}); 
/*
app.get('/input_post',function(){
    $(document).ready(function(){
        $(".tables")
    })
})*/