const { urlencoded } = require("body-parser");
const express = require("express");
const app = express()
const route = require('./routes/index')
const cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware')
const vLibrasproxyMiddleware = require('./middlewares/vLibrasProxyMiddleware');
const appProxyMiddleware = require("./middlewares/appProxyMiddleware");
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.use(express.static('src'))
app.use(express.json())
app.use(urlencoded({extended: true}))

app.use('/', route)

const PORT = 3333

/*  Rota para fornecer ao front-end as variáveis de ambiente necessárias para 
definir os caminhos relativos dos assets,  garantindo compatibilidade independente 
do servidor que inicialize a aplicação (monorepo ou raiz). */ 

app.get('/env', (req, resp) => {
    resp.json({
        ASSETS_PATH: process.env.ASSETS_PATH,
        PORT: PORT
    })
})

/*--------------------------------------------------------------------------- */

app.use(vLibrasproxyMiddleware);

// proxy route
app.use('/app', appProxyMiddleware)

app.use('/plugin', () => console.log("testando plugin"));

app.listen( PORT, () => console.log(`TESOUROS HISTÓRICOS RODANDO NA PORTA ${PORT} \n`))