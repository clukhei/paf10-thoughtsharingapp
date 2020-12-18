const express = require('express')
const router = express.Router()
const sha = require('sha1')
const {sqlQuery} = require('../mysql_db')

router.post('/', (req,res)=> {
    console.log(req.body)
    const user = req.body.username
    const password = sha(req.body.password)
    sqlQuery.matchUserPass([user])
        .then(([result, _]) =>{
           if (!result || result.password != password) {
               res.type('application/json')
               res.status(401).json({message: "Invalid user or password"}) 
           }

            if ( result.password === password){
             
                res.type('application/json')
                res.status(200).json({message: "Auth success"})
            } 
        }).catch(e=> {
            console.log(e)
            res.status(500).json({message: "Server Error"})
        })
    
})

module.exports = router