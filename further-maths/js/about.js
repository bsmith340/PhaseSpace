// About BcsMaths: why it exists. The story lives in ABOUT so it can be edited in one place.
'use strict';

const ABOUT = {
  name: 'Ben Smith',
  where: 'Northern Ireland',
  story: [
    "I'm Ben, an A level student in Northern Ireland sitting CCEA Mathematics — and teaching myself CCEA Further Mathematics alongside it.",
    "I'm predicted three A*s. Getting there on my own was harder than it needed to be. Most textbooks don't follow the CCEA specification exactly, so you never quite know what's on your paper and what isn't. Past papers come without explanations. And when you're self-teaching there's nobody to ask whether you've understood something or just memorised it.",
    'So I built the resource I wanted when I started: every unit of both qualifications, every learning outcome quoted word for word from the CCEA specification, and for each one a proper explanation, worked examples, and questions that mark themselves until it sticks.',
  ],
};

function viewAbout() {
  const nUnits = COURSE_ORDER.length, nPts = COURSE_ORDER.reduce((s, id) => s + COURSES[id].points.length, 0);
  const feat = ([i, c, t, d]) => `<div class="card tile" style="--tc:${c}"><span class="ti">${ico(i)}</span><b>${t}</b><small>${d}</small></div>`;
  mount(`<nav class="crumbs"><a href="#/">Courses</a> / About</nav>
  <section class="hero about-hero"><p class="kicker">About BcsMaths</p><h1>Built by a student who <span class="grad">needed it</span>.</h1>
    <p class="lead">Why this exists, what's in it, and how to get the most from it.</p></section>
  <article class="card about-story">${ABOUT.story.map(p => `<p>${esc(p)}</p>`).join('')}<p class="sig">— ${esc(ABOUT.name)}</p></article>
  <h2 class="sech">What makes it different</h2>
  <section class="grid tiles">${[
    ['spec', '#0a84ff', 'Spec first', `All ${nUnits} CCEA units, with every learning outcome quoted from the official specification and linked to the chapter that teaches it.`],
    ['book', '#ff9500', 'Explained properly', 'A textbook chapter for each of the ' + nPts + ' points: the idea, full proofs and derivations, worked examples, common mistakes and exam technique.'],
    ['drill', '#ff2d55', 'Practice that marks itself', 'Unlimited questions with worked solutions. Smart drill sends you back to whatever you are weakest at.'],
    ['sims', '#af52de', 'See it move', 'Simulations, a grapher and a Lab of tools for checking your own working.'],
    ['sigma', '#5e5ce6', 'Formula books', 'Every result tagged as in the CCEA booklet or one you must learn.'],
    ['papers', '#34c759', 'Honest about papers', 'Links to the real CCEA papers, mark schemes and reports. Nothing is invented, and every exam-style question is labelled as an original.'],
  ].map(feat).join('')}</section>
  <h2 class="sech">How to use it</h2>
  <ol class="card about-steps">
    <li><b>Pick your unit</b> from Mathematics or Further Mathematics. On the applied Further Maths units, choose the two sections you are sitting.</li>
    <li><b>Read the chapter</b> for the next spec point, and try the check-yourself questions before opening the answers.</li>
    <li><b>Drill it</b> until it reads "Secure", then use Smart drill and Sprints to keep everything fresh.</li>
    <li><b>Finish with real papers</b> from CCEA's website, and log your scores and tricky questions on the Papers page.</li>
    <li><b>Save your progress</b> from Settings now and then. It lives only in this browser.</li></ol>
  <div class="box notice"><b>Not affiliated with CCEA.</b> BcsMaths is an independent study resource. Learning outcomes are quoted from CCEA's GCE Mathematics (2018) and GCE Further Mathematics (2018) specifications. Always check CCEA's website for the current version and for the papers themselves.</div>
  <p class="credit center">${CREDIT}</p>`);
}
