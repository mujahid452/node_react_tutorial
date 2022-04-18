const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler.js');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', routesHandler);
mongoose.connection.close();

mongoose.connect('mongodb+srv://mujahid:mujee452@cluster0.ei15p.mongodb.net/ToDoListDb?retryWrites=true&w=majority' ,{ useNewUrlParser: true, useUnifiedTopology: true} )
.then ( () => {
    console.log('Db Connected');
})
.catch( (err) => {
    console.log(err);
})
 
const PORT = process.env.PORT || 4000; // backend routing port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
