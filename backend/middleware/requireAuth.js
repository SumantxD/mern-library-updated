const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requireAuth = async (req, res, next) => {

    //verify authentication
    const {authorization} = req.headers


    if(!authorization){
        return res.status(401).json({error: 'Authorizatom token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRET)

        //we will use the id from the payload to try to find teh user in the database

        req.user = await User.findOne({_id}).select('_id')//we have the request object here in the database
        //and we are attaching this user property to the request
        //so that when we go to the next piece of middleware
        //on the request object in those functions we will be going to have this user property
        //because we are attaching it in this function which runs first

        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }

}

module.exports = requireAuth