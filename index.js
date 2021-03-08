//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', ejs);
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/urlDB", {useNewUrlParser: true, useUnifiedTopology: true})

app.get('/', (req,res) => {
    res.send("Hello");
})

app.post('/short', (req, res) => {
	
})

app.listen(process.env.PUBLIC_PORT, () => {
	console.log('Server started on port' + PUBLIC_PORT);
})