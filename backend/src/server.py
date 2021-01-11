import http.server as s
from urllib.parse import urlparse, parse_qs
import json

class ServerHandler(s.BaseHTTPRequestHandler):
    def do_GET(self):
        parsed_url = urlparse(self.path)
        path = parsed_url.path
        query = parse_qs(parsed_url.query)
        self.send_response(200)
        self.send_header("User-Agent","test1")
        self.end_headers()
        html = 'parsed: path = {}, query = {}'.format(path, query)
        self.wfile.write(html.encode())

    def do_POST(self):
        content_len  = int(self.headers.get("content-length"))
        body = json.loads(self.rfile.read(content_len).decode('utf-8'))
        body["answer"] = "hello, world!"
        self.send_response(200)
        self.send_header('Content-type', 'application/json;charset=utf-8')
        self.end_headers()
        body_json = json.dumps(body, sort_keys=False, indent=4, ensure_ascii=False) 
        self.wfile.write(body_json.encode("utf-8"))

host = '0.0.0.0'
port = 8080
httpd = s.HTTPServer((host, port), ServerHandler)
httpd.serve_forever()
