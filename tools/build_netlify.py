"""Build a single-file, Netlify-ready bundle of the BCS Academy site (Maths, Further Maths and Physics).

Output: dist/netlify/index.html (all CSS/JS inlined) and bcs-academy-netlify.zip
with index.html at the zip root, ready for Netlify Drop.
"""
import pathlib, re, zipfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / 'further-maths'
OUT = ROOT / 'dist' / 'netlify'

html = (SRC / 'index.html').read_text()

# Inline the local stylesheets (the design system, then the physics styles)
html = re.sub(r'<link rel="stylesheet" href="(css/[^"]+)">', lambda m: f'<style>\n{(SRC / m.group(1)).read_text()}\n</style>', html)

# KaTeX must be loaded before the app runs, so load it synchronously in <head>
html = re.sub(r'<script defer (src="https://cdnjs[^"]+")></script>', r'<script \1></script>', html)

# Pull local scripts out of <head> and inline them at the end of <body>
local = re.findall(r'\s*<script defer src="(js/[^"]+)"></script>', html)
html = re.sub(r'\s*<script defer src="js/[^"]+"></script>', '', html)
# physics.js and the past-papers bundle are loaded on demand by the app (see loadBundle() in js/app.js) instead
# of a <script src> tag, so they're missed above — a single-file bundle needs them inlined too, or the dynamic
# loader's fetch('js/physics.js') has nothing to find once everything is one HTML file with no js/ folder.
local += [
    'js/physics.js',
    'js/bcsp.js', 'js/bcsp-m1.js', 'js/bcsp-m2.js', 'js/bcsp-m3.js', 'js/bcsp-m4.js',
    'js/bcsp-f1.js', 'js/bcsp-f2.js', 'js/bcsp-fm.js', 'js/bcsp-f4.js',
    'js/bcsp-as1.js', 'js/bcsp-as2.js', 'js/bcsp-a21.js', 'js/bcsp-a22.js',
    'js/ccea-papers.js', 'js/walkthrough.js', 'js/papers.js',
]
def js(p):
    code = (SRC / p).read_text()
    assert '</script' not in code.lower(), f'{p} contains </script and would end its inline block early'
    return f'<script>\n{code}\n</script>'
bundle = '\n'.join(js(p) for p in local)
html = html.replace('</body>', bundle + '\n</body>')

OUT.mkdir(parents=True, exist_ok=True)
(OUT / 'index.html').write_text(html)
zpath = ROOT / 'bcs-academy-netlify.zip'
with zipfile.ZipFile(zpath, 'w', zipfile.ZIP_DEFLATED) as z:
    z.write(OUT / 'index.html', 'index.html')
print(f'{OUT / "index.html"} ({len(html) // 1024} KB), {zpath.name} ({zpath.stat().st_size // 1024} KB)')
