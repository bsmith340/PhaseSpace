"""Build a single-file, Netlify-ready bundle of the Further Maths site.

Output: dist/netlify/index.html (all CSS/JS inlined) and phasespace-fm-netlify.zip
with index.html at the zip root, ready for Netlify Drop.
"""
import pathlib, re, zipfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / 'further-maths'
OUT = ROOT / 'dist' / 'netlify'

html = (SRC / 'index.html').read_text()

# Inline the stylesheet
css = (SRC / 'css' / 'app.css').read_text()
html = html.replace('<link rel="stylesheet" href="css/app.css">', f'<style>\n{css}\n</style>')

# KaTeX must be loaded before the app runs, so load it synchronously in <head>
html = re.sub(r'<script defer (src="https://cdnjs[^"]+")></script>', r'<script \1></script>', html)

# Pull local scripts out of <head> and inline them at the end of <body>
local = re.findall(r'\s*<script defer src="(js/[^"]+)"></script>', html)
html = re.sub(r'\s*<script defer src="js/[^"]+"></script>', '', html)
bundle = '\n'.join(f'<script>\n{(SRC / p).read_text()}\n</script>' for p in local)
html = html.replace('</body>', bundle + '\n</body>')

OUT.mkdir(parents=True, exist_ok=True)
(OUT / 'index.html').write_text(html)
zpath = ROOT / 'phasespace-fm-netlify.zip'
with zipfile.ZipFile(zpath, 'w', zipfile.ZIP_DEFLATED) as z:
    z.write(OUT / 'index.html', 'index.html')
print(f'{OUT / "index.html"} ({len(html) // 1024} KB), {zpath.name} ({zpath.stat().st_size // 1024} KB)')
