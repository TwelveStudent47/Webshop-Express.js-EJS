const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require("./controllers/error");
const db = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");

const app = express();

// A templating engine átállítja ejs-re
app.set('view engine', 'ejs');

// Beállítja a bodyParser-t
app.use(bodyParser.urlencoded({ extended: false }));
// Statikus fájlok kiszolgálása a 'public' könyvtárból
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
    try {
        const user = await User.findByPk(1);
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
    }
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {
    constraints: true,
    onDelete: "CASCADE"
});

User.hasMany(Product);

db.sync().then(result => {
    return User.findByPk(1);
}).then(user => {
    if (!user) {
        User.create({name: "Kevin", email: "test@gmail.com"});
    }
    return Promise.resolve(user);
}).then(user => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
});


