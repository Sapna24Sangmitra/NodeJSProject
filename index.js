const express = require('express');
const bodyParser = require ('body-parser');
const session = require('express-session');

const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const index = express();

index.set('view engine', 'ejs');
index.set('views', __dirname + '/views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');


index.use(bodyParser.urlencoded({ extended: false}));

index.use(
  session({secret:'my secret', resave:false, saveUninitialized:false})
  );

index.use((req, res, next) => {
  res.locals.role = req.session.role;
  console.log(res.locals.role+"role");
  next();
})

index.use('/admin', adminRoutes);
index.use(shopRoutes);
index.use(authRoutes);

Product.belongsTo(User,{constraints: true, onDelete: 'CASCADE'});     
User.hasMany(Product);
User.hasOne(Order);
Order.belongsTo(User);
Order.belongsToMany(Product, {through: OrderItem});
Product.belongsToMany(Order, {through: OrderItem});

sequelize
  .sync()
  .then(result => {
    index.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });