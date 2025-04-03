const express =  require("express")
const route = express.Router()
const apicache = require("apicache")

const cache = apicache.middleware("5 minutes")

route.get('/', cache ,(req, res) => {
    try{
        if(process.env.NODE_ENV !== 'production'){
            console.log(`Testando REQUEST: ${req.url}`)
        }
        
        res.status(200).json({ message: 'main rote is working' })
    }catch(error){
        res.status(500).json({error})
    }
})

module.exports = route