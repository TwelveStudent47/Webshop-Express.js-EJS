const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require("./controllers/error")
const db = require("./util/database")

const app = express();

// A templating engine átállítja ejs-re
app.set('view engine', 'ejs');

// Beállítja a bodyParser-t
app.use(bodyParser.urlencoded({ extended: false }));
// Statikus fájlok kiszolgálása a 'public' könyvtárból
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

db.sync().then(result => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
});


