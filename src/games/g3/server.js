const { urlencoded } = require("body-parser");
const express = require("express");
const app = express()
const route = require('./routes/index')
const cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware')
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
const proxyMiddleware = createProxyMiddleware({
    target: 'https://cdn.jsdelivr.net/gh/spbgovbr-vlibras/vlibras-portal@dev', // URL do servidor externo
    changeOrigin: true,
    pathRewrite: {
      [`http://localhost:${PORT}/app/target`]: 'https://cdn.jsdelivr.net/gh/spbgovbr-vlibras/vlibras-portal@dev/app/target', // Remove o prefixo /api da URL e ajusta o caminho
    },
    on:{
        proxyReq: (proxyReq, req, res) => {
            proxyReq.setHeader('sec-fetch-mode', 'cors')       
        },
    }
})
app.use(proxyMiddleware);

// proxy route
app.use('/app', createProxyMiddleware({
    target: 'https://vlibras.gov.br/app',
    changeOrigin: true,
    on: {
        proxyReq: (proxyReq, req, res) => {
            proxyReq.setHeader('Access-Control-Allow-Origin', '*');
            proxyReq.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            proxyReq.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            proxyReq.setHeader('sec-fetch-mode', 'no-cors')
            proxyReq.setHeader('Origin', 'https://vlibras.gov.br')
            proxyReq.setHeader('Referer', 'https://vlibras.gov.br')
            proxyReq.removeHeader('cache-control');

            console.log(`[Proxy Request] ${req.method} ${req.originalUrl}`)
        },
        proxyRes: (proxyRes, req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.setHeader('sec-fetch-mode', 'no-cors')
            res.removeHeader('cache-control');
            
            console.log(`[Proxy Response] ${res.statusCode}`);
        }
    }
}))

app.use('/plugin', () => console.log("testando plugin"));

app.listen( PORT, () => console.log(`TESOUROS HISTÓRICOS RODANDO NA PORTA ${PORT} \n`))