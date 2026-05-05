import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const BASE = 'https://raw.githubusercontent.com/Corvus-Malus/XKeen-docs/main/images/Light';

// Try all possible full names for the missing files
const missing = [
  { out: 'xk_paragon1.png', urls: [
    `${BASE}/Paragon-Partition-Manager-Free-Light.png`,
    `${BASE}/Paragon-Partition-Manager-Free-1-Light.png`,
    `${BASE}/Paragon-Partition-Manager-Light.png`,
    `${BASE}/Paragon-Partition-Manager.png`,
  ]},
  { out: 'xk_config_gen1.png', urls: [
    `${BASE}/XKeen-Config-Generator-Light.png`,
    `${BASE}/XKeen-Config-Gen-Light.png`,
    `${BASE}/XKeen-Config-Generator.png`,
    `${BASE}/XKeen-Config-Gen.png`,
    `${BASE}/XKeen-config-gen-Light.png`,
    `${BASE}/XKeen-Config-Generator-Light.jpg`,
    `${BASE}/XKeen-Config-Gen-Light.jpg`,
  ]},
  { out: 'xk_entware_backup.png', urls: [
    `${BASE}/entware-backup-Light.png`,
    `${BASE}/entware-backup.png`,
    `${BASE}/Entware-backup-Light.png`,
    `${BASE}/Entware-backup.png`,
  ]},
];

mkdirSync('./public/images', { recursive: true });

for (const { out, urls } of missing) {
  if (existsSync(`./public/images/${out}`)) { console.log(`EXISTS ${out}`); continue; }
  let found = false;
  for (const url of urls) {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }).catch(() => null);
    if (!res || !res.ok) continue;
    const buf = await res.arrayBuffer();
    if (buf.byteLength < 500) continue;
    writeFileSync(join('./public/images', out), Buffer.from(buf));
    console.log(`OK    ${out} ← ${url.split('/').pop()} (${(buf.byteLength/1024).toFixed(0)}kb)`);
    found = true;
    break;
  }
  if (!found) console.log(`MISS  ${out}`);
}

// Also list ALL files in the repo to find exact names
console.log('\nFetching full file list from repo...');
const api = await fetch('https://api.github.com/repos/Corvus-Malus/XKeen-docs/git/trees/main?recursive=1').catch(() => null);
if (api?.ok) {
  const data = await api.json();
  const imgs = (data.tree || []).filter(f => /\.(png|jpg|jpeg)$/i.test(f.path));
  console.log('\nAll images in repo:');
  imgs.forEach(f => console.log(' ', f.path));
}
