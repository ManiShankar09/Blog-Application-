const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://manishankar:Newpassword123@cluster0.ii5gstz.mongodb.net/Blog')
.then(() => console.log('Connected to Database successfully'))
.catch((err) => console.log('Error', err));

const Schema = new mongoose.Schema({
    title:String,
    summary:String,
    image : String,
    value : String,
    year : Number,
    month : Number,
    day : Number

});



const blogModel = mongoose.model('blogs', Schema);

module.exports = blogModel;