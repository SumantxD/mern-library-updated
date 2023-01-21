const mongoose = require('mongoose');

// we will assign each book with the user_id property so that we can identify
//which person created which book 

const bookSchema = new mongoose.Schema({
    title: {type:String, required:true},
    author: {type:String, required:true},
    description: {type:String, required:true},
    user_id: {type:String, required:true}
},{
    timestamps: true,
});

const Book = mongoose.model('book', bookSchema)

module.exports = Book