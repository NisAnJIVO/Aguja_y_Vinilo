import urllib.request
import re

url = "https://madebymutant.com/cdn/shop/t/16/assets/base.css?v=43581667910826247371765220330"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req, timeout=10) as res:
    css = res.read().decode("utf-8", errors="ignore")
    # find header or nav styles
    headers = re.findall(r'(\.header[^{]*\{[^}]+\})', css)
    for h in headers[:10]:
        print("HEADER CSS:", h)
    
    # find list-menu or menu styles
    menus = re.findall(r'(\.list-menu[^{]*\{[^}]+\})', css)
    for m in menus[:10]:
        print("MENU CSS:", m)

    # find all font-face declarations
    ff = re.findall(r'@font-face\s*\{([^}]+)\}', css)
    for f in ff:
        print("FONT FACE:", f.strip())

