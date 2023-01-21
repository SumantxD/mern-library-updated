const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    email: {type:String, required:true, unique: true},
    password: {type:String, required:true},
    username: {type:String, required:true}
},{
    timestamps: true
});


//static signup method
//this is how we create an additional static method on the model
userSchema.statics.signup = async function(email, password, username) { 


    //validation 
    if(!email || !password || !username){
        throw Error('All fields must be filled')
    }

    //now we know that all the three values exists
    if(!validator.isEmail(email)){//is the email valid
        throw Error('Email is not valid')
    }

    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }


    const exists = await this.findOne({email})
    if(exists){
        throw Error('Email already in use')
    }

    //bcrpyt will add salt to the current password before hashing it
    //this will add extra layer of security so that hackerw will not be able to do 
    //password matching

    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password:hash, username})

    return user
}

//static login method
userSchema.statics.login = async function(email, password, username) { 


    //validation 
    if(!email || !password || !username){
        throw Error('All fields must be filled')
    }

    //we do not need to check for valid email and strong password


    const user = await this.findOne({email})
    if(!user){//if we can't find a user with that particular email
        throw Error('Incorrect Email')
    }

    const match = await bcrypt.compare(password, user.password)//we will pass the password and the hashed password
    //bcrypt will return true or false depending whether they are trur or false

    //if they do match we will return the user 
    if(!match){
        throw Error('Incorrect Password')
    }

    return user
}



const User = mongoose.model('user', userSchema)

module.exports = User