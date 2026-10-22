// BCS Academy original papers: each js/bcsp-<unit>.js file registers its three papers here (see docs/build/BRIEF.md).
const BCSP = { list: [], add(p) { this.list.push(p); }, forUnit(u) { return this.list.filter(p => p.unit === u); } };
