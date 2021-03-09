//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const ShortURL = require('./models/url');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }))

mongoose.connect("mongodb://localhost:27017/urlDB", {useNewUrlParser: true, useUnifiedTopology: true})

app.get('/', async (req,res) => {
    const allData =  await ShortURL.find()
	res.render('index', { shortUrls: allData })
})

app.post('/short', async (req, res) => {

    const fullUrl = req.body.fullUrl
	console.log('URL requested: ', fullUrl)

    const newRecord = new ShortURL({
        full: fullUrl
    })

    await newRecord.save(function(err){
        if(!err){
            console.log("url read successfully")
        }
    })

    res.redirect('/');
	
})

app.get('/:shortid', async (req, res) => {
	const shortid = req.params.shortid
	const rec = await ShortURL.findOne({ short: shortid })
	
	if (!rec) return res.sendStatus(404)

	rec.clicks++
	await rec.save()

	res.redirect(rec.full)
})

mongoose.connection.on('open', async () => {
	// Wait for mongodb connection before server starts

	// Just 2 URLs for testing purpose
	await ShortURL.create({ full: 'http://yahoo.com' })
	await ShortURL.create({ full: 'http://codedamn.com' })

	app.listen(process.env.port || 3000, () => {
		console.log('Server started')
	})
})