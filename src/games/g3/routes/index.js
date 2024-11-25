const url = require("url")
const express =  require("express")
const route = express.Router()
const apicache = require("apicache")

// initialize cache
// const cache = apicache.middleware 

route.get('/', (req, res) => {
    try{
        if(process.env.NODE_ENV !== 'production'){
            console.log(`REQUEST: ${req.url}`)
        }
        
        app.use(express.static('public'))
        res.status(200).json({ message: 'main rote is working' })
    }catch(error){
        res.status(500).json({error})
    }
})

module.exports = route