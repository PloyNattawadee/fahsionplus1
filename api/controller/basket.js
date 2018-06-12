const OrderDetail = require('../model/db').OrderDetail
const routeOrder = require('express').Router()

routeOrder.post('/addtocart', (req, res) => {

    let geniddetail = 1;
    OrderDetail.count('orderdetailid').then((max) => {
        geniddetail = "ODT-" + (max + 1);
    }).then((iddetail) => {
        const basket = {
           // orderdetailid: geniddetail,
            quantity: req.body.qty,
            unitprice: req.body.unitprice,
            orderid : req.body.orderid
        };
        Ordetail.create(basket, (req, res) => {
        }).then((detail) => {
            res.json({
                status: '1'
            })
        })

    }).catch((err) => {
        console.log(err)
        res.json({
            status: '0'
        })
    })

})