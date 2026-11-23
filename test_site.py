import http.server, socketserver, threading, subprocess, sys, time, urllib.request, urllib.error, os

PORT = 8198
os_dir = "/c/Users/finan/plusonestore"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=os_dir, **kw)

with socketserver.ThreadingTCPServer(("", PORT), Handler) as httpd:
    httpd.daemon_threads = True
    t = threading.Thread(target=httpd.serve_forever, daemon=True)
    t.start()
    # wait for server to be ready
    ready = False
    for _ in range(30):
        try:
            urllib.request.urlopen("http://localhost:%d/" % PORT, timeout=1)
            ready = True
            break
        except Exception:
            time.sleep(0.1)
    print("Server ready:", ready)

    def get(path):
        try:
            r = urllib.request.urlopen("http://localhost:%d%s" % (PORT, path), timeout=5)
            return r.status, len(r.read())
        except urllib.error.HTTPError as e:
            return e.code, 0
        except Exception as e:
            return "ERR", 0

    print("=== Pages ===")
    pages = ["index.html","shop.html","product.html","cart.html","checkout.html","about.html","contact.html"]
    for p in pages:
        status, length = get(p)
        print(f"  {p:22s} -> {status}")

    print("=== Images ===")
    missing = []
    images = ["blouse-luna","blouse-adelia","blouse-rania","blouse-lina","jubah-safiya","jubah-mira","jubah-nura","thobe-emirati","kurung-bella","kurung-adib","kebaya-dol","kemeja-adila","kemeja-mini","blouse-batik","batik-sedondon","hijab-lyra","hijab-zara","shawl-ansista","koszul-tenun","koszul-woven","abaya-dhalia","kids-batik","kids-kebaya","selendang-akbar","tudung-nikmat","plus-size-1","plus-size-2","plus-size-3"]
    for img in images:
        status, _ = get("images/placeholders/%s.svg" % img)
        if status != 200:
            missing.append(img)
    print("  Missing:", missing if missing else "none")

    print("=== JS Syntax ===")
    for f in ["js/main.js","js/cart.js","js/products.js"]:
        r = subprocess.run(["node","--check",f], capture_output=True, text=True)
        print("  %s -> %s" % (f, "OK" if r.returncode==0 else r.stderr.strip()))
