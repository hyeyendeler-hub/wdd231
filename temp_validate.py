import urllib.request
import urllib.parse
import json

with open('site-plan.html', 'r', encoding='utf-8') as f:
    html = f.read()

if not html.strip().lower().startswith('<!doctype'):
    html = '<!DOCTYPE html>' + html

data = {
    'content': html,
    'out': 'json',
    'parser': 'html'
}

req = urllib.request.Request(
    'https://validator.w3.org/nu/',
    data=urllib.parse.urlencode(data).encode(),
    headers={
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
)

resp = urllib.request.urlopen(req)
result = json.loads(resp.read())
messages = result.get('messages', [])
errors = [m for m in messages if m.get('type') == 'error']
print(f'ERRORS: {len(errors)}')
for m in errors:
    line = m.get('lastLine', '?')
    msg = m.get('message', 'unknown error')
    print(f"Line {line}: {msg}")
