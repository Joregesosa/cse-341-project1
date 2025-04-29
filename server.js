const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongodb = require('./data/database');

app.use(express.json());

app.use('/', require('./routes'))

mongodb.initDb((err) => {
    if (err) {
        console.error(err);
    } else { 
        app.listen(PORT, () => { console.log(`Database is listening and node Running on port ${PORT}`)});
    }
});
     
