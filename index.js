require('dotenv').config()
const express                   = require('express')
const cors                      = require('cors')
const path                      = require('path')
const {createProxyMiddleware}   = require('http-proxy-middleware')
const { urlencoded }            = require('body-parser')
const emailRoute                = require('./routes/emailRoutes')
const compression               = require('compression')
// add helmet

const app = express()
const PORT = 9999



app.use(compression())
app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.static(path.resolve(__dirname, 'src')))
app.use('/games/g1', express.static(path.join(__dirname, 'src/games/g1')))
app.use('/games/g2', express.static(path.join(__dirname, 'src/games/g2')))
app.use('/games/g3', cors(), express.static(path.join(__dirname, 'src/games/g3')))
app.use('/games/g4', express.static(path.join(__dirname, 'src/games/g4')))
app.use('/games/g5', express.static(path.join(__dirname, 'src/games/g5')))

// Usa as rotas de e-mail
app.use(emailRoute)

// rota para obter variaveis de ambiente que serão necessárias no front para definir os caminhos relativos dos assets
// idependente do servidor que inicialize a aplicação (monorepo ou raiz)

app.get('/env', (req, resp) => {
    resp.json({
        ASSETS_PATH: process.env.APP_ASSETS_PATH,
        PORT: PORT
    })
})

/*--------------------------------------------------------------------------- */
const proxyMiddleware = createProxyMiddleware({
    target: 'https://cdn.jsdelivr.net/gh/spbgovbr-vlibras/vlibras-portal@dev', // URL do servidor externo
    changeOrigin: true,
    pathFilter: '**/*.unityweb',
    pathRewrite: {
      [`http://localhost:${PORT}/app/target`] : 'https://cdn.jsdelivr.net/gh/spbgovbr-vlibras/vlibras-portal@dev/app/target', // Remove o prefixo /api da URL e ajusta o caminho
    },
    on:{
        proxyReq: (proxyReq, req, res) => {
            proxyReq.setHeader('sec-fetch-mode', 'no-cors')            
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
            proxyReq.setHeader('Origin', 'https://vlibras.gov.br')
            proxyReq.setHeader('Referer', 'https://vlibras.gov.br')
            proxyReq.setHeader('sec-fetch-mode', 'no-cors')
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

app.listen(PORT, () => console.log(`PLATAFORMA-DGAS RODANDO NA PORTA ${PORT}  \n`))