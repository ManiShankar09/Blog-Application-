const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://manishankar:Newpassword123@cluster0.ii5gstz.mongodb.net/Blog')
.then(() => console.log('Connected to Database successfully'))
.catch((err) => console.log('Error', err));

const Schema = new mongoose.Schema({
    username:String,
    email:String,
    password:String

});



const model = mongoose.model('users', Schema);

module.exports = model;