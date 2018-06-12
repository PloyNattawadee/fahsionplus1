const Transaction = require('../model/db').Transaction
const routeCookie = require('express').Router()
const cookieParser = require('cookie-parser');

routeCookie.post('/cookies', (req, res) => {
    var cookie = req.body.cookiekey

    Transaction.findOne({
        where: {
            tranname: cookie
        }
    }).then((cookie) => {
        if (cookie != null || cookie != undefined) {
            return res.json({
                status: '1'
            })
        } else {
            return res.json({
                status: '0'
            })
        }
    }).catch((err) => {
        console.log(err)
    })
})
module.exports = routeCookie