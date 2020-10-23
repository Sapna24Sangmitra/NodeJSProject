const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
    });
};

exports.postAddProduct = (req, res, next) => {
    const name = req.body.name;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const currency = req.body.currency;
    Product.create({
        name: name,
        imageUrl: imageUrl,
        description: description,
        price: price,
        currency: currency
    })
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('admin/products', {
                prods: products,
            });
        })
        .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
    const prodId = req.params.prodId;
    Product.findByPk(prodId)
        .then(products => {
            console.log(products)
            res.render('admin/edit-product', {
                prods: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.params.prodId;
    const updatedName = req.body.name;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const updatedPrice = req.body.price;
    const updatedCurrency = req.body.currency;
    Product.findByPk(prodId)
        .then(product => {
            product.name = updatedName;
            product.imageUrl = updatedImageUrl;
            product.description = updatedDescription;
            product.price = updatedPrice;
            product.currency = updatedCurrency;
            return product.save();
        })
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postDeleteProduct = (req, res, next) => {

    const prodId = req.body.id;
    console.log(prodId)
    Product.findByPk(prodId)
        .then(product => {
            return product.destroy();
        })
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};