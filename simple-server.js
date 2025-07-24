import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = http.createServer((req, res) => {
  // Servir el archivo standalone.html para cualquier ruta
  const filePath = path.join(__dirname, 'standalone.html');
  
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Cache-Control': 'no-cache'
  });
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Error 404: File not found');
      return;
    }
    res.end(data);
  });
});

const PORT = 8080;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor TicTacToe funcionando en puerto ${PORT}`);
  console.log(`📱 Accede en: http://localhost:${PORT}`);
});