const fs = require('fs');
const files = ['chamber/index.html', 'chamber/directory.html', 'chamber/join.html', 'chamber/discover.html', 'chamber/thankyou.html'];

files.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  const issues = [];
  if (!html.includes('lang="en"')) issues.push('Missing lang');
  if (!html.includes('<meta name="viewport"')) issues.push('Missing viewport');
  
  const buttonNoType = html.match(/<button(?![^>]*type=)[^>]*>/g);
  if (buttonNoType) {
    issues.push('Buttons missing type: ' + buttonNoType.length);
  }

  const idRegex = /id="([^"]+)"/g;
  const ids = [];
  let match;
  while ((match = idRegex.exec(html)) !== null) ids.push(match[1]);
  const uniqueIds = new Set(ids);
  if (ids.length !== uniqueIds.size) issues.push('Duplicate IDs');

  const imgNoAlt = html.match(/<img(?![^>]*alt=)[^>]*>/g);
  if (imgNoAlt) issues.push('Images missing alt: ' + imgNoAlt.length);

  console.log(f + ': ' + (issues.length ? issues.join('; ') : 'OK'));
});
