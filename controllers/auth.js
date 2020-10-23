const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('auth/login');
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password= req.body.password;
    req.session.role = req.body.role;
    User.findOne({where: {email:email}})
        .then(user => {
            if(!user){
                return res.redirect('/login');
                }
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if(doMatch){
                        req.session.isLoggedIn = true;
                        req.session.user=user.id;
                        return req.session.save(err => {
                            res.redirect('/admin/products');
                        });
                    }
                    res.redirect('/login');
                })
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getSignup = (req, res, next) => {
    res.render('auth/signup');
};

exports.postSignup = (req, res, next) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    const role=req.body.role;
    const confirmedpassword = req.body.confirmedpassword;
    User.findOne({where:{email: email}})
        .then(userDoc => {
            if(userDoc){
                return res.redirect('/signup');
            }
            return bcrypt.hash(password, 12)           
                .then(hashedPassword => {
                const user = new User({
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: hashedPassword,
                    role:role
                 });
                return user.save();
             })
            .then( result => {
                res.redirect('/login');
             })
            })
            .catch(err => {
                console.log(err);
            });
};  

