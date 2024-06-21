
const express = require('express');
const app = express();
const path = require('path');

const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

// 'templates' 폴더를 뷰 디렉토리로 설정
//app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

app.use('/assets', express.static(path.join(__dirname, 'assets')));

const mongoclient = require('mongodb').MongoClient;
const ObjId = require('mongodb').ObjectId;
const url = `mongodb+srv://admin:1234@cluster0.ou9gktz.mongodb.net/
?retryWrites=true&w=majority&appName=Cluster0`;

let mydb;
mongoclient.connect(url)
    .then(client=>{
        console.log("몽고DB 접속 성공");
        mydb=client.db('myhouse');
        app.listen(8080, function () {
            console.log('8080 server ready...');
        });  
    })
    .catch(err=>{
        console.log(err);
    });

    app.get('/index', function(req, res) {
        mydb.collection('building')
            .find()
            .toArray()
            .then(result=>{
                console.log(result);
                // res.send(result);
                // res.sendFile(__dirname+"/list.html");
                res.render('index.ejs', {data:result});
            });
    });

    app.get('/realtylist', function(req, res) {
        mydb.collection('building')
            .find()
            .toArray()
            .then(result=>{
                console.log(result);
                res.render('realtylist.ejs', {data:result});
            });
    });

    app.get('/realtyenter', function (req, res) {
        res.render('realtyenter.ejs');
    });

    app.post('/save', (req, res) => {
        console.log(req.body);
        mydb.collection('building').insertOne({
            block:req.body.block,
            unit:req.body.unit,
            address:req.body.address,
            area:req.body.area,
            housing_type:req.body.housing_type,
            price:req.body.price,
            date:req.body.date
        }).then(result => {
            console.log('저장 완료', result);
            res.redirect('/realtylist');
        }).catch(err =>{
            console.error('저장 실패', err);
            res.status(500).send('저장 실패');
        });
    });

    app.post('/delete', (req, res) => {
        console.log(req.body._id);              //문자 형태 출력
        req.body._id=new ObjId(req.body._id);
        console.log(req.body._id);              //객체 형태 출력
        mydb.collection('building')
        .deleteOne(req.body)                    // {_id:Object('hdfjdjkflsdkl') }
        .then(result=>{
            console.log('삭제 완료');
            res.status(200).send();
        })
        .catch(err=>{
            res.status(500).send();
        });
    });

    app.get('/realtycontent/:_id', (req, res) => { 
        mydb.collection('building')
            .findOne({_id:new ObjId(req.params._id)})       //req.body가 없기 때문에 사용 불가(get방식에서는 body가 공백)
            .then(result => {
                res.render('realtycontent.ejs', {data:result});
            })
            .catch((err) => {
                // console.log(err);
                res.status(500).send();
            });
    });

    app.get('/edit/:_id', (req, res)=> {
        console.log(req.params._id);
        mydb.collection('building')
            .findOne({_id:new ObjId(req.params._id)})
            .then(result => {
                res.render('edit.ejs', {data:result});
            })
            .catch((err) => {
                // console.log(err);
                res.status(500).send();
            });
    });

    app.post('/edit', (req, res)=> {
        console.log(req.body);
        mydb.collection('building')
            .updateOne({_id:new ObjId(req.body._id)},
            {$set:{title:req.body.title, content:req.body.content, date:req.body.someDate}})
            .then(result => {
                console.log('수정 완료');
                res.redirect('/realtylist');
            })
            .catch((err) => {
                // console.log(err);
                res.status(500).send();
            });
    });