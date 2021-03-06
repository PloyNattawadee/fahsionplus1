const express = require('express');
const mysql = require('mysql');
const Register = require('./api/model/db')
const route = require('./api/controller/register')
const routecategory = require('./api/controller/category')
const routeproduct = require('./api/controller/product')
const routeImg = require('./api/controller/productimage')
const routeAdmin = require('./api/controller/admin')
const routeCookie = require('./api/controller/cookies')
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const url = require('url');
const path = require('path')
const morgan = require('morgan');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');

const app = express();

// clientยิงoptions มาก่อน
http.createServer(function (req, res ,next) {
    //console.log(method.req)
 
   //console.log("Header : "+headers)
    const { headers, method, url } = req;
    let body = [];
    let setcookiekey = [];

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Set-Cookie', setcookiekey);
   
    req.on('error', (err) => {
        console.log(err);
    }).on('data', (user) => {
        //body += user
        body.push(user)
        setcookiekey.push(user)
    }).on('end', () => {
        let post = querystring.parse(body);
        const responseBody = { headers, method, url, body };
        res.write("Successfull");
      //  console.log("ploy" + body);
        console.log("DATA: " + JSON.stringify(post));
        console.log("cookname"+setcookiekey)
        res.end();

    });

})
app.listen('3000', () => {
    console.log('Server started on port 3000');
});

app.use(cookieParser());
route.use(cookieParser());

route.use(cors())
routeproduct.use(cors())
routeImg.use(cors())
routecategory.use(cors())
routeAdmin.use(cors())
routeCookie.use(cors())
//cookieHelper.use(cors())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }))
app.use(bodyParser.json({limit: '50mb'}))
app.use(morgan('dev'))

app.use('/account', route)
app.use('/category',routecategory)
app.use('/product',routeproduct)
app.use('/image',routeImg)
app.use('/admin',routeAdmin)
app.use('/check',routeCookie)



