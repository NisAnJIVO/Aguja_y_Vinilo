import urllib.request
import re

req = urllib.request.Request("https://madebymutant.com/collections/music", headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
try:
    with urllib.request.urlopen(req, timeout=8) as res:
        content = res.read().decode("utf-8", errors="ignore")
        # search for font names
        font_matches = re.findall(r'font-family\s*:\s*([^;}\r\n]+)', content)
        print("Inline fonts:", set(font_matches))
        
        # search for font files or @font-face
        woffs = re.findall(r'https?://[^\s\'"]+\.(?:woff2?|ttf|otf)', content)
        print("Woff URLs:", set(woffs[:10]))
        
        # search for link stylesheets
        links = re.findall(r'href=["\']([^"\']+\.css[^"\']*)["\']', content)
        print("CSS links:", links[:5])
        for link in links[:5]:
            if link.startswith("//"):
                link = "https:" + link
            elif link.startswith("/"):
                link = "https://madebymutant.com" + link
            try:
                css_req = urllib.request.Request(link, headers={"User-Agent": "Mozilla/5.0"})
                with urllib.request.urlopen(css_req, timeout=8) as css_res:
                    css_data = css_res.read().decode("utf-8", errors="ignore")
                    ff = re.findall(r'@font-face\s*\{([^}]+)\}', css_data)
                    for item in ff:
                        print("FOUND FONT FACE:\n", item.strip())
            except Exception as e:
                pass
except Exception as e:
    print("Error:", e)

