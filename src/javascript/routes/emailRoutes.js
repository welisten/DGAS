const express = require('express')
const sendEmail = require('../utils/emailSender')

const router = express.Router()

router.post('/send-email', async (req, res) => {
    const {name, cell, email, subject, message} = req.body
    console.log(name, cell, email, subject, message)

    try{
        await sendEmail({name, cell, email, subject, message})
        res.status(200).send('Email enviado com sucesso')
    }catch(erro){
        console.log(erro)
        res.status(500).send('Falha ao enviar o email. Abra o console para verificar o erro')
    }
})

module.exports = router