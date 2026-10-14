const http = require('node:http');
const PORT = 3000;
 
const server = http.createServer((req, res) => {
    res.on('finish', () => {
        console.log(`[LOG] Método: ${req.method} | URL: ${req.url} | Status: ${res.statusCode}`);
    });

    res.setHeader('Content-Type', 'application/json');
 
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200);
        return res.end(JSON.stringify({ mensagem: 'Olá, back-end!' }));
    }
    if (req.method === 'GET' && req.url === '/status') {
        res.writeHead(200);
        return res.end(JSON.stringify({ status: 'ok', uptime: process.uptime() }));
    }
    
    if (req.method === 'POST' && req.url === '/status') {
        res.writeHead(405);
        return res.end(JSON.stringify({ erro: 'Method Not Allowed - Use GET para esta rota' }));
    }

    if (req.method === 'GET' && req.url === '/hora') {
        const horaAtual = new Date().toLocaleTimeString('pt-Br');
        res.writeHead(200);
        return res.end(JSON.stringify({ hora: horaAtual, iso: new Date().toISOString() }));
    }

    if (req.method === 'POST' && req.url === '/eco') {
        let corpoRequisicao = '';

        req.on('data', pedaco => {
            corpoRequisicao += pedaco;
        });

        req.on('end', () => {
            res.writeHead(201);
            return res.end(JSON.stringify({ 
                mensagem: "Dados recebidos com sucesso!", 
                dadosRecebidos: corpoRequisicao 
            }));
        });
        return;
    }
    res.writeHead(404);
    res.end(JSON.stringify({ erro: 'Rota não encontrada' }));
});
 
server.listen(PORT, () => console.log(`Rodando em http://localhost:${PORT}`));