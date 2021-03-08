//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const ShortUrl = require('./models/url');

const app = express();

app.set('view engine', ejs);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }))

mongoose.connect("mongodb://localhost:27017/urlDB", {useNewUrlParser: true, useUnifiedTopology: true})

app.get('/', (req,res) => {
    res.render('index', { myVariable: 'John Doe' })
})

app.post('/short', async (req, res) => {

    const fullUrl = req.body.fullUrl
	console.log('URL requested: ', fullUrl)

    const newRecord = new ShortUrl({
        full: fullUrl
    })
    await newRecord.save(function(err){
        if(!err){
            console.log("url read successfully")
        }
    })

    res.redirect('/');
	
})

app.listen(process.env.PUBLIC_PORT, () => {
	console.log('Server started on port' + PUBLIC_PORT);
})