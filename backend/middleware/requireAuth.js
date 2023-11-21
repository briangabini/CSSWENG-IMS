const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
    
    // verify authentication
    // headers give access to content-type json etc.
    // important: has authorization property
    
    const {authorization} = req.headers

    console.log(authorization) 
    // console.log(authorization.split(' ')[1]) 

    // also important to send headers to the frontend
    // check authorization headers                                          
    if(!authorization){
        return res.status(401).json({error: 'Authorization token required'}) 
    }

    // We split because the token of authorization when sent is a string
    // "Bearer token..." hence a need to split by a space
    const token = authorization.split(' ')[1]

    console.log(token)

    try{
        // it needs secret to verify the signature from token
        // if authentication is successful, returns the _id from the payload
        const { _id } = jwt.verify(token, 'gustokomaglarongcs2')

        // attach a user property to req object
        // so you find one id in the db, but you only select the id
        // property since you don't need the other properties like email
        req.user = await User.findOne({_id}).select('_id') 
        next()
        
    } catch(error){
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth