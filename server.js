const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const {initDb} = require('./data/database');

app.use(express.json());

app.use((req, res, next)=>{
    res.setHeader('content-type', 'application/json');
    next();
})

app.use('/', require('./routes'))

initDb((err) => {
    if (err) {
        console.error(err);
    } else { 
        app.listen(PORT, () => { console.log(`Database is listening and node Running on port ${PORT}`)});
    }
});
     
