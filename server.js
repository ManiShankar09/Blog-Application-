const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const database = require('./db');
const blogdb = require('./blogdb');
app.use(cors());
app.use(express.json());
const requireLogin  = false;
const loggedin = false;

database
 


app.post('/register', (req,res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const file = req.body.formData
    console.log(file);
    const userDoc = database.create({username, email, password, file});
    if(userDoc){
        console.log('Created successfully');
        res.status(200).json({data : 'created successfully'})
    }
    else{
        console.log('failed to create');
        res.status(400).json({data : 'failed to create'})
    }
})

app.post('/login', async(req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email,password);
    const userDoc = await database.findOne({email :email});
    
    if(userDoc && userDoc.password === password) {
        loggedin = true;
        res.status(200).json({data : 'matched'})
    }else{
        res.status(400).json({data : 'not matched'});

    }
})

app.post('/create', async(req,res) => {
    const title = req.body.title;
    const summary = req.body.summary;
    const value = req.body.cleanedValue;
    const image = req.body.image;
    const year = req.body.year;
    const month = req.body.month;
    const day = req.body.day;

    const userDoc = blogdb.create({title : title, summary : summary, value : value, image : image, year: year, month : month, day : day});

    if(userDoc && requireLogin){
        console.log('Created Successfully');
        res.status(200).json({data : 'Created Successfully'})
    }else{
        console.log('Failed to create');
        res.status(400).json({data : 'Failed to create'})
    }
})

app.get('/data', async(req,res) => {
    await blogdb.find({}).then(users => {
        if(users) {
            res.status(200).json(users)
        }else{
            res.status(400).json({data : 'not recieved'})
        }
    })
    
});

app.get('/username', async(req, res) => {
    await database.find({}).then(username => {
        if(username){
            res.status(200).json(username)
        }
        else{
            res.status(400).json({data : 'User not found'})
        }
    })
})

app.post('/blog', async(req, res) => {
    const title =  req.body.selecteddiv;
    console.log(title);
    const blogDoc = blogdb.findOne({title : title}).then(blog => {
        if(blog){
            console.log(blog);
            res.status(200).json({data : blog});
        }
        else{
            console.log('not found');
        }
    })
    res.send(blogDoc);
})





app.listen(4000, () => console.log('Server stated on port 4000'));