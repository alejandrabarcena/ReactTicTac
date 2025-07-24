#!/usr/bin/env python3
import http.server
import socketserver
import os

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Servir standalone.html para cualquier petición
        if self.path == '/' or self.path == '':
            self.path = '/standalone.html'
        return http.server.SimpleHTTPRequestHandler.do_GET(self)
    
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

if __name__ == "__main__":
    PORT = 8080
    os.chdir('/home/runner/workspace')
    
    with socketserver.TCPServer(("0.0.0.0", PORT), MyHTTPRequestHandler) as httpd:
        print(f"🚀 TicTacToe Server funcionando en puerto {PORT}")
        print(f"📱 Accede en: http://localhost:{PORT}")
        print("✨ Ctrl+C para parar el servidor")
        httpd.serve_forever()