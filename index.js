const express   = require('express')
const cors      = require('cors')
const path      = require('path')
const {createProxyMiddleware} = require('http-proxy-middleware')

const app = express()

app.use(express.static('src'))

app.use('/games/g1', express.static(path.join(__dirname, 'src/games/g1')))
app.use('/games/g2', express.static(path.join(__dirname, 'src/games/g2')))
app.use('/games/g3', cors(), express.static(path.join(__dirname, 'src/games/g3')))
app.use('/games/g5', express.static(path.join(__dirname, 'src/games/g5')))

const proxyMiddleware = createProxyMiddleware({
    target: 'https://cdn.jsdelivr.net/gh/spbgovbr-vlibras/vlibras-portal@dev', // URL do servidor externo
    changeOrigin: true,
    pathFilter: '**/*.unityweb',
    pathRewrite: {
      'http://localhost:9999/app/target': 'https://cdn.jsdelivr.net/gh/spbgovbr-vlibras/vlibras-portal@dev/app/target', // Remove o prefixo /api da URL e ajusta o caminho
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


// app.use( createProxyMiddleware({
//     target: 'https://vlibras.gov.br',
//     changeOrigin: true,
//     on: {
//         proxyReq: (proxyReq, req) => {
//             // tentar ver o resutado por aqui e depois descartar a callback
//         }
//     }
// }))

app.listen(9999, () => console.log('plataforma teste sendo ouvida na porta 9999'))