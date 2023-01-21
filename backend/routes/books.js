const {
    createBook,
    getBook,
    getBooks,
    deleteBook,
    updateBook
} = require('../controllers/bookControllers')
const requireAuth = require('../middleware/requireAuth')

const router = require('express').Router()


//require auth for all book routes
router.use(requireAuth)//this will fire up the middleware function berofe all of the stuffs below it
//as we want to protect all of the below things

//if the user in not authenticated we will send back an error
//and the user will never get to these controller function below it which will give him access to the route


//from now on for all the crud operatins we have to send the token in the header
//in order to get the access


//to get all the books
router.get('/' , getBooks)

//to get a single book
router.get('/:id' , getBook)

//add a new book
//we will extract all the information from teh body of the request
router.post('/' , createBook)

//delete an existing book
router.delete('/:id', deleteBook);

//update a book
router.patch('/:id', updateBook);

module.exports  = router

