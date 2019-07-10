// include mysql module
var express = require('express');
var app = express();
var mysql = require('mysql');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
app.use('/script', express.static(__dirname + "/script"));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'cat', // 암호화
    resave: false, // 항상 저장할지 여부 (false : 권장)
    saveUninitialized: true, //초기화되지 않은채 저장
    store: new FileStore()
}));
app.use(cookieParser());

app.get('/', (req, res)=>{
    if(req.session.logined){
        con.query("SELECT name, dodo FROM register where pw = ?",
        [req.session.pw],
        (err, result)=>{
            if(err) console.log(err.message);
            if(result.length > 0){
                res.render(__dirname + '/views/main.ejs', {na: result[0].name, todo: result[0].dodo});
            } else {
                res.render(__dirname + '/views/main.ejs', {na: result[0].name});
            }
        })
    } else{
        res.sendFile(__dirname + '/views/join.html');
    }
});

// create a connection variable with the required details
var con = mysql.createConnection({
  host: "localhost", // ip address of server running mysql
  user: "root", // user name to your mysql database
  password: "1234", // corresponding password
  database: "mydb" // use the specified database
});

app.post('/join.html', (req, res)=>{
    var body = req.body;
    con.query("INSERT INTO register (name, id, pw) VALUES(?, ?, ?)",
    [body.na, body.id, body.pw],
    (err, result)=>{
        if(err) console.log(`insert error : ${err.message}`);
        else{
            res.render(__dirname + '/views/reg_result.ejs', {r_result : true});
        }
    })
})

app.post('/main.ejs', (req, res, event)=>{
    if(event.persisted){
        if(!req.session.logined){
            res.sendFile(__dirname + '/views/new_login.html');
        }
    }
    var body = req.body;
    var pw = req.body.pw;
    con.query("SELECT * FROM register WHERE id = ?", [req.body.id],
    (err, result)=>{
        if(err){
            res.send("Failld");
        } else {
            if(result.length > 0){
                if(result[0].pw == pw) {
                    req.session.pw = body.pw;
                    req.session.logined = true;
                    con.query("SELECT name FROM register where id = ?", [req.body.id],
                        (err, result)=>{
                            if(err) res.send(message(err));
                            // else res.render(__dirname + '/views/main.ejs', {na : result[0].name});
                            else res.sendFile(__dirname + '/views/main.html');
                        }
                    )
                } else {
                    res.render(__dirname + '/views/login_result.ejs', {l_result : false});
                }
            } else {
                res.render(__dirname + '/views/login_result.ejs', {l_result : false});
            }
        }
    })
})


    app.post('/api/post', (req, res)=>{
        var todo = req.body.data;
        con.query("UPDATE register SET dodo = (?) where pw = (?)",
        [req.body.data, req.session.pw],
        (err,result)=>{
            if(err) console.log(err.message);
            else{
                res.send({result:todo});
            }
    })
})

    app.post('/api/post/db_delete',  (req, res)=>{
        con.query("UPDATE register SET dodo = NULL where pw = (?)",
        [req.session.pw],
        (err,result)=>{
            if(err) console.log(err.message);
        })
    })

// app.post('/redirect', (req, res)=>{
//     var body = req.body;
//     con.query("INSERT INTO todo (todo) VALUES(?)",
//     [body.todo]),
//     (err, result)=>{
//         if(err) console.log(`insert error : ${err.message}`);
//         else{
//             res.redirect('/');
//         }
//     }
// })
// app.get(, (req,res)=>{
//     res.render(__dirname + '/views/main.ejs');
// })

app.get('/logout.ejs', (req,res)=>{
    delete req.session.pw;
    req.session.logined = false;
    res.render(__dirname + '/views/logout.ejs');
});

app.get('/new_login.html', (req,res)=>{
    res.sendFile(__dirname + '/views/new_login.html');
})

app.get('/join.html', (req, res)=>{
    res.sendFile(__dirname + '/views/join.html');
})

app.listen(8080, function(){
    console.log('8080 포트에서 대기 중');
});