const User = require('../models/user')

const jwt = require('jsonwebtoken')

//we can reuse this function  which can generate these tokens for us
//in both the login controller function as well as in the signup controller fucntion 
const createToken = (_id) =>{
    //inside the sign method we will pass three arguments
    //first will be an object which will represent the payload on the token that we want 
    //second will be a secret string only known to the server
    //the third arguments will be options //here we will put the expiresIn property
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

//login user
//also in the login controller function after the user successfull logs in 
//we will send a token
const loginUser = async (req,res) => {//now we will make the login for login user
    // res.json({mssg: 'login user'})
    //this time we are not creating the user in the database
    //we will take the email and the password that we are logging with 
    //and try to match that with any of the document already existing in the database
    //if the email for that user exists in the database then we will try to compare the 
    //password using the bcrypt library to verify that login

    //now we will use the static method in the login user function 
    
    const {email, password, username} = req.body //we will get that from the post request by the client

    try {
        const user = await User.login(email, password, username)
        //we need that token inside this controller function //after we have signed up 
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({errorer: error.message})
    }    



}

//signup user
//we will send a token back in this case after the user has been successful signed up 
const signupUser = async (req,res) => {
    const {email, password, username} = req.body

    
    try {
        const user = await User.signup(email, password, username)
        //we need that token inside this controller function //after we have signed up 
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({errorer: error.message})
    }

    // res.json({message: "this is a message"})

}

module.exports = {
    signupUser,
    loginUser
}