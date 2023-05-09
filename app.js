const express = require('express');
const path = require('path');
//-----------------Connecting mongoose --------------------------
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
// --------------------------------------------------------------------
const bodyparser = require('body-parser');
const app = express();
const fs = require('fs');
const port = 3000;

// Defining mongoose schema and making model
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    concern: String
});

var contact = mongoose.model("Contact", contactSchema);

// Express specific configuration
app.use('/static', express.static('static'));
app.use(express.urlencoded());


// PUG specific configuration
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'templates'));

 
// Endpoints:
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
});

// ------- Creating post request ------------
// First install body-parser     > npm install body-parser
app.post('/contact', (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("Data has been saved ");
    }).catch(()=>{
        res.status(404).send("Please Fill again, Data has not been saved ");
    });
});


app.use('./static',express.static('static'));

// START the server
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`)
});