require('dotenv').config()

const WaterContent = require('./models/waterfootprint.js')
const mongoose = require('mongoose')
const express = require('express');
const bodyParser = require('body-parser');
const { error } = require('console');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(3000, () => {
            console.log('Listening to port');
            console.log('Connected to database');
        })
    })
    .catch((error) => {
        console.log(error);
    })

app.get('/api/:query', async(req, res)  =>  {
    try{
        const object = req.params.query;
        console.log(object);
        const result = await WaterContent.findOne({Object : object });
        if (result) {
            console.log(result.WaterContent);
            res.status(200).json(result.WaterContent); 
        } else {
            res.status(404).json({ message: "Object not in Database" });
        }
    }
    catch(error){
        res.status(500).json({error : error.message})
    }
})

app.post('/post' , async (req,res) => {

    try{

        const post = {
            Object: req.body.object,
            WaterContent: req.body.WaterContent
        }
        const postData = new WaterContent(post) 
        await postData.save();
        res.status(200)
    }
    catch(error){
        res.status(500).json({error : error.message})
    }
})
