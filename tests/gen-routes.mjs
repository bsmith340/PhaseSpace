// Generates the full list of app routes to smoke-test, from the same data files the app itself loads
// (via tools/seo/load-data.mjs) so the list never drifts out of date with the content.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadData } from '../tools/seo/load-data.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = path.join(ROOT, 'further-maths');

const { COURSES, COURSE_ORDER, PHYS } = loadData(SITE);

const routes = new Set(['#/']);
const QUALS = ['maths', 'further', 'physics'];
for (const q of QUALS) routes.add(`#/${q}`);
for (const shared of ['#/lab', '#/sims', '#/calc', '#/settings', '#/about', '#/account', '#/account/signin', '#/account/signup', '#/admin/reports']) routes.add(shared);

for (const id of COURSE_ORDER) {
  const c = COURSES[id];
  for (const leaf of ['', 'spec', 'book', 'drill', 'sprint', 'formulae', 'papers', 'progress']) routes.add(`#/${id}${leaf ? '/' + leaf : ''}`);
  for (const t of c.topics) routes.add(`#/${id}/topic/${t.id}`);
  for (const p of c.points) routes.add(`#/${id}/point/${p.id}`);
}

for (const u of PHYS.UNITS) {
  routes.add(`#/physics/${u.id}`);
  routes.add(`#/physics/${u.id}/spec`);
  routes.add(`#/physics/${u.id}/papers`);
}
routes.add('#/physics/practice');
routes.add('#/physics/tutor');

const list = [...routes].sort();
const out = path.join(ROOT, 'tests', 'routes.generated.json');
fs.writeFileSync(out, JSON.stringify(list, null, 1) + '\n');
console.log(`${list.length} routes written to ${path.relative(ROOT, out)}`);
