const express = require('express');
const app = express();

const session = require('express-session');
const cookieParser = require('cookie-parser');

const path = require('path');

const mongoclient = require('mongodb').MongoClient;
const ObjId = require('mongodb').ObjectId;
const url = `mongodb+srv://admin:1234@cluster0.ou9gktz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
app.use(bodyParser.urlencoded({ extended: true }));

//'templates' 폴더를 뷰 디렉토리로 설정
//app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(cookieParser());
app.use(session({
    secret: 'secret-key',           //키 임의설정
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    }
}));

let mydb;
mongoclient.connect(url)
    .then(client => {
        console.log("몽고DB 접속 성공");
        mydb = client.db('myhouse');
        app.listen(8080, function () {
            console.log('8080 server ready...');
        });
    })
    .catch(err => {
        console.log(err);
    });

app.get('/data-endpoint', async function (req, res) {
    const sortCriteria = req.query.sort;
    const page = parseInt(req.query.page) || 1;

    let filterOption = {};
    let sortOption = {};

    switch (sortCriteria) {
        case 'p25':
            filterOption = { area: '25평' };
            break;
        case 'p30':
            filterOption = { area: '30평' };
            break;
        case 'p35':
            filterOption = { area: '35평' };
            break;
        case 'p40':
            filterOption = { area: '40평' };
            break;
        case 'p45':
            filterOption = { area: '45평' };
            break;
        case 'jeonse':
            filterOption = { housing_type: '전세' };
            break;
        case 'wolse':
            filterOption = { housing_type: '월세' };
            break;
        case 'own':
            filterOption = { housing_type: '자가' };
            break;
        case 'rent':
            filterOption = { housing_type: '임대' };
            break;
        case 'priceAsc':
            sortOption = { price: 1 };
            break;
        case 'priceDesc':
            sortOption = { price: -1 };
            break;
        case 'dateNew':
            sortOption = { num: -1 };
            break;
        case 'dateOld':
            sortOption = { num: 1 };
            break;
        case 'onsale':
            filterOption = { status: '판매중' };
            break;
        case 'soldout':
            filterOption = { status: '판매완료' };
            break;
        default:
            sortOption = {};
    }

    try {
        const totalItems = await mydb.collection('building').find(filterOption).count();
        const items = await mydb.collection('building')
            .find(filterOption)
            .sort(sortOption)
            .skip((page - 1) * 10)
            .limit(10)
            .toArray();

        res.json({ items, totalPages: Math.ceil(totalItems / 10) });
    } catch (err) {
        console.error(err);
        res.status(500).send("데이터 가져오기 실패");
    }
});

app.get('/index', function (req, res) {
    mydb.collection('building')
        .find()
        .toArray()
        .then(result => {
            // console.log(result);
            res.render('index.ejs', {
                data: result,
                isLoggedIn: req.session.isLoggedIn
            });
        });
});

app.get('/realtylist', checkAuth, function (req, res) {
    mydb.collection('building')
        .find()
        .toArray()
        .then(result => {
            console.log(result);
            res.render('realtylist.ejs', {
                data: result,
                isLoggedIn: req.session.isLoggedIn
            });
        });
});

app.get('/count', (req, res) => {
    mydb.collection('building').countDocuments()
        .then(count => {
            res.json({ count });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('데이터 수 가져오기 실패');
        })
});

app.get('/realtyenter', checkAuth, function (req, res) {
    res.render('realtyenter.ejs', {
        isLoggedIn: req.session.isLoggedIn
    });
});

app.get('/realty', function (req, res) {
    res.render('realty.ejs', { isLoggedIn: req.session.isLoggedIn });
});

app.post('/save', async (req, res) => {
    const price = parseInt(req.body.price);
    console.log(req.body);

    try {
        const counter = await mydb.collection('counter').findOne({ name: '게시물갯수' });
        const totalPost = counter.totalPost;

        const sessionId = req.session.userId;
        console.log(sessionId);
        const user = await mydb.collection('user').findOne({ userId: sessionId });
        const userObjId = user._id.toString();
        console.log(userObjId);

        const result = await mydb.collection('building').insertOne({
            num: totalPost + 1,
            userObjId,
            block: req.body.block,
            unit: req.body.unit,
            address: req.body.address,
            extraAddress: req.body.extraAddress,
            area: req.body.area,
            housing_type: req.body.housing_type,
            price,
            date: req.body.date,
            status: req.body.status
        });

        await mydb.collection('counter').updateOne(
            { name: '게시물갯수' }, {
            $inc: { totalPost: 1 }
        });

        console.log('저장 완료', result);
        res.redirect('/realtylist');
    } catch (err) {
        console.error('저장 실패', err);
        res.status(500).send('저장 실패');
    }
});

app.post('/delete', (req, res) => {
    console.log(req.body._id);              //문자 형태 출력
    req.body._id = new ObjId(req.body._id);
    console.log(req.body._id);              //객체 형태 출력
    mydb.collection('building')
        .deleteOne(req.body)                    // {_id:Object('hdfjdjkflsdkl') }
        .then(result => {
            console.log('삭제 완료');
            res.status(200).send();
        })
        .catch(err => {
            res.status(500).send();
        });
});

app.get('/realtycontent/:_id', checkAuth, (req, res) => {
    mydb.collection('building')
        .findOne({ _id: new ObjId(req.params._id) })       //req.body가 없기 때문에 사용 불가(get방식에서는 body가 공백)
        .then(result => {
            res.render('realtycontent.ejs', {
                data: result,
                isLoggedIn: req.session.isLoggedIn
            });
        })
        .catch((err) => {
            // console.log(err);
            res.status(500).send();
        });
});

app.get('/realtyedit/:_id', checkAuth, (req, res) => {
    console.log(req.params._id);
    mydb.collection('building')
        .findOne({ _id: new ObjId(req.params._id) })
        .then(result => {
            res.render('realtyedit.ejs', {
                data: result,
                isLoggedIn: req.session.isLoggedIn
            });
        })
        .catch((err) => {
            // console.log(err);
            res.status(500).send();
        });
});

app.post('/buy', (req, res) => {
    console.log(req.body._id);              //문자 형태 출력
    req.body._id = new ObjId(req.body._id);
    console.log(req.body._id);              //객체 형태 출력
    mydb.collection('building')
        .updateOne({ _id: new ObjId(req.body._id) },
            {
                $set: {
                    status: '판매완료'
                }
            })
        .then(result => {
            res.send({ message: '구매완료' });
        })
        .catch(err => {
            res.status(500).send();
        })
});

app.post('/realtyedit', (req, res) => {
    const price = parseInt(req.body.price);
    mydb.collection('building')
        .updateOne({ _id: new ObjId(req.body._id) },
            {
                $set: {
                    block: req.body.block,
                    unit: req.body.unit,
                    address: req.body.address,
                    extraAddress: req.body.extraAddress,
                    area: req.body.area,
                    housing_type: req.body.housing_type,
                    price,
                    date: req.body.date
                }
            })
        .then(result => {
            res.redirect('/realtylist');
        })
        .catch((err) => {
            res.status(500).send();
        });
});

app.get('/signUp', function (req, res) {
    res.render('signUp.ejs');
})

app.post('/signUp', function (req, res) {
    const phone = req.body.phone1 + req.body.phone2 + req.body.phone3;
    const email = req.body.email1 + '@' + req.body.email2;

    console.log(req.body);
    mydb
        .collection('user')
        .insertOne({
            userId: req.body.userId,
            userPw: req.body.userPw,
            userName: req.body.userName,
            gender: req.body.gender,
            birthdate: req.body.birthdate,
            email,
            phone,
            address: req.body.address,
            extraAddress: req.body.extraAddress

        })
        .then(result => {
            console.log('저장 완료', result);
            return res.redirect('/login');

        }).catch(err => {
            console.error('저장 실패', err);
            res.status(500).send('저장 실패');
        });
})

// 스키마 정의
app.post('/member/overlapped', async (req, res) => {
    const { userId } = req.body;

    // MongoDB에서 userId로 검색
    const existingUser = await mydb
        .collection('user')
        .findOne({ userId: userId });

    if (existingUser) {
        res.send('true'); // 중복된 아이디가 있음을 클라이언트에게 응답
    } else {
        res.send('false'); // 중복된 아이디가 없음을 클라이언트에게 응답
    }
});

app.get('/login', function (req, res) {
    if (req.session.isLoggedIn) {
        //세션이 이미 존재하면 인덱스 페이지로 리다이렉트
        res.redirect('/index');
    } else {
        res.render('login.ejs', { isLoggedIn: false });
    }
});


app.post('/login', (req, res) => {
    const userId = req.body.userId;
    const userPw = req.body.userPw;

    mydb.collection("user")
        .findOne({ userId: userId })
        .then(result => {
            if (result) {
                if (userPw === result.userPw) {
                    req.session.userId = userId;
                    req.session.isLoggedIn = true;
                    return res.json({ success: true, redirectUrl: '/index' });
                } else {
                    return res.json({ success: false, message: '로그인 실패' });
                }
            } else {
                return res.json({ success: false, message: '유효하지 않은 사용자 정보' });
            }
        }).catch(err => {
            console.log(err);
            return res.json({ success: false, message: '로그인 실패' });
        });
});

app.get('/logout', (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.redirect('/index');
            }
            res.clearCookie('connect.sid', {
                sameSite: 'lax',
                secure: false,
                httpOnly: true,
                path: '/'

            });
            console.log('Session destroyed and cookie cleared.');
            res.redirect('/index');
        });
    } catch (error) {
        console.error('Unexpected error during logout:', error);
        res.redirect('/index');
    }
});

// 세션 확인 미들웨어
function checkAuth(req, res, next) {
    if (req.session.isLoggedIn) {
        next();
    } else {
        res.redirect('/login?message=로그인이 필요합니다');
    }
}