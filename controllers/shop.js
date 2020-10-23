const Product = require('../models/product');
const Order = require('../models/order');

exports.getIndex = (req, res, next) => {
    Product
        .findAll()
        .then(products => {
            res.render('shop/index',{
                prods: products
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then(products => {
            console.log(products)
            res.render('shop/product-details', {
                product: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/order');
};

exports.postOrder = (req, res, next) => {
    const prodId = req.body.id;
    const price = req.body.price;
    userId = req.session.user;
    Order.create({
        payment_id: prodId,
        payer_id: prodId,
        payment_total: price,
        userId: userId
    })
        .then(result => {
            result.setProducts(prodId)
                .then(result => {
                    res.redirect('/orders')
                    result.setProducts(prodId)
                        .then(result => {
                            console.log("setting product to order");
                        })
                        .catch(error => {
                            console.log(error);
                        })
                })
                .catch(error => {
                    console.log(error);
                })
        }).catch(error => {
            console.log(error);
        })

} 