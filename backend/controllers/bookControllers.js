const Book = require('../models/book');
const mongoose = require('mongoose');

//we will be creating functions for


//getting all the books
//here we will limit it with the id of the user
const getBooks = async (req,res) => {

    const user_id = req.user._id

    const books = await Book.find({user_id}).sort({createdAt: -1})
    res.status(200).json(books)
}

//get a single book
const getBook = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){//if the id that we got is not valid
        return res.status(404).json({error: 'No such book'})
    }

    const book = await Book.findById(id)

    if(!book){
        return res.status(404).json({error: 'No such book'})
    }

    res.status(200).json(book)

}

//create a new book
const createBook = async (req,res) => {

    const {title, author, description} = req.body
    //we can use teh Book model to add a new book document to the books collection

    let emptyFields = []

    if(!title){
        emptyFields.push('Title')
    }

    if(!author){
        emptyFields.push('Author')
    }

    if(!description){
        emptyFields.push('Description')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error: 'please fill in all the fields', emptyFields})
    }
    
    try {
        const user_id = req.user._id
        const book = await Book.create({title, author, description, user_id})
        res.status(200).json(book)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

//delete an existing book
const deleteBook = async (req,res) => {
    const {id} = req.params

    //check for the validity of the id
    if(!mongoose.Types.ObjectId.isValid(id)){//if the id that we got is not valid
        return res.status(404).json({error: 'No such book'})
    }

    //we will use the filter to find it and delte it 
    const book = await Book.findByIdAndDelete({_id: id})

    //check for the availability of that book
    if(!book){
        return res.status(404).json({error: 'No such book'})
    }

    res.status(200).json(book)
}

//update a book
const updateBook = async (req,res) =>{
    const {id} = req.params
    
    //check for the validity of the id
    if(!mongoose.Types.ObjectId.isValid(id)){//if the id that we got is not valid
        return res.status(404).json({error: 'No such book'})
    }   

    const book = await Book.findByIdAndUpdate({_id:id}, {
        ...req.body
    })

    //check for the availability of that book
    if(!book){
        return res.status(404).json({error: 'No such book'})
    }

    res.status(200).json(book)

}

module.exports =  {
    createBook,
    getBook,
    getBooks,
    deleteBook,
    updateBook
}