const nodemailer = require('nodemailer')
require('dotenv').config()

async function sendEmail({name, cell, email, subject, message}){
    let newMessage

    if(message && typeof message === 'string'){
        newMessage = `Mensagem de ${name} - Telefone: ${cell}\n\Email para resposta: ${email}n\n` + message
    }
    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: 'gmail',
        auth:{
            user:'wesleywelistenoficial@gmail.com',
            pass: process.env.EMAIL_PASS
        },
        tls:{ rejectUnauthorized: false},
        connectionTimeout: 20000,
        greetingTimeout: 20000,
        socketTimeout:20000,
        debug: true,
        logger: true
    })

    const mailOptions = {
        from: email,
        to: 'dgas.contato@gmail.com',
        subject: subject,
        text: newMessage || message
    }

    await transport.sendMail(mailOptions)
    console.log(process.env.EMAIL_PASS)
}
module.exports = sendEmail