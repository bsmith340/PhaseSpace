// CCEA GCE Further Mathematics — AS 1 Pure Mathematics course definition.
// Outcomes are quoted from the CCEA GCE Further Mathematics (2018) specification, Section 3.2 (pp. 9–12).
'use strict';

const CCEA_FM_SOURCES = [
  { label: 'CCEA — GCE Further Mathematics (2018) subject page', url: 'https://ccea.org.uk/post-16/gce/subjects/gce-further-mathematics-2018' },
  { label: 'CCEA — GCE Further Mathematics (2018) specification (PDF)', url: 'https://www.ccea.org.uk/downloads/docs/Specifications/GCE/GCE%20Further%20Mathematics%20%282018%29/GCE%20Further%20Mathematics%20%282018%29-specification-Standard_2.pdf' },
  { label: 'CCEA — Mathematical Formulae and Tables booklet (PDF)', url: 'https://ccea.org.uk/downloads/docs/Support/General/2019/Mathematical%20Formulae%20and%20Tables.pdf' },
];
const CCEA_FM_OFFICIAL = [
  ['CCEA GCE Further Mathematics (2018) — subject page (past papers, mark schemes, reports)', 'https://ccea.org.uk/post-16/gce/subjects/gce-further-mathematics-2018'],
  ['CCEA — GCE past papers & mark schemes index', 'https://ccea.org.uk/post-16/gce/past-papers-mark-schemes'],
  ["Chief Examiner's Report — Summer 2025 (PDF)", 'https://ccea.org.uk/downloads/docs/ExamMod-Reports/GCE/GCE%20Further%20Mathematics%20%282018%29/2025/GCE%20Further%20Mathematics%20%282018%29-Summer2025-Report_0.pdf'],
  ["Chief Examiner's Report — Summer 2024 (PDF)", 'https://ccea.org.uk/downloads/docs/ExamMod-Reports/GCE/GCE%20Further%20Mathematics%20%282018%29/2024/GCE%20Further%20Mathematics%20%282018%29-Summer2024-Report_0.pdf'],
  ['Mathematical Formulae and Tables booklet (PDF)', 'https://ccea.org.uk/downloads/docs/Support/General/2019/Mathematical%20Formulae%20and%20Tables.pdf'],
  ['Maths Genie — CCEA Further Maths past papers (third-party index)', 'https://www.mathsgenie.co.uk/a-level/further-maths/ccea'],
];

const numbered = (code, list) => list.map((o, i) => [code + (i + 1), o]); // FM outcomes are coded F1, C1, M1, V1, …

defineCourse({
  id: 'f1', short: 'FM AS 1', name: 'Further Mathematics', unit: 'AS 1 Pure Mathematics', qual: 'further', level: 'AS', unitNo: 'AS 1', uname: 'Pure Mathematics',
  board: 'CCEA GCE Further Mathematics (2018)', icon: 'ℂ', color: '#5856d6', paper: 'AS 1',
  exam: 'External written examination · 1 hour 30 minutes · 6–10 questions · 100 raw marks · answer all questions (50% of AS, 20% of A level)',
  specRef: 'CCEA GCE Further Mathematics (2018) specification, Section 3.2 (pp. 9–12)',
  assumes: 'Assumes knowledge of Unit AS 1 of GCE Mathematics (quadratics, the factor theorem, trigonometry, vectors in 2D).',
  tagline: 'Roots of quadratics, complex numbers and the Argand diagram, matrices and transformations, vectors in three dimensions.',
  sources: CCEA_FM_SOURCES, official: CCEA_FM_OFFICIAL,
  known: 'Outcomes on this page are quoted from the CCEA GCE Further Mathematics (2018) specification, Section 3.2, Unit AS 1.',
  defaultPapers: ['Summer 2026 · AS 1', 'Summer 2025 · AS 1', 'Summer 2024 · AS 1', 'Summer 2023 · AS 1', 'Summer 2022 · AS 1'],
  formulae: () => FORMULAE_F1,
  spec: [
    { id: 'f1-al', code: 'F', title: 'Further Algebra and Functions', icon: 'α+β', color: '#af52de', blurb: 'Roots and coefficients of quadratics; equations with related roots.',
      outcomes: numbered('F', ['demonstrate understanding of and use the relationship between roots and coefficients of quadratic equations;', 'form a quadratic equation whose roots are related to the roots of a given quadratic equation;']),
      points: [['f1_roots', 'core', 'Roots and coefficients of quadratic equations', '', ['F1']], ['f1_trans', 'core', 'Forming equations with related roots', '', ['F2']]] },
    { id: 'f1-cx', code: 'C', title: 'Complex Numbers', icon: 'ℂ', color: '#007aff', blurb: 'Arithmetic, conjugates, polynomial equations, the Argand diagram, modulus–argument form and loci.',
      outcomes: numbered('C', ['solve any quadratic equation with real coefficients;', 'solve cubic or quartic equations with real coefficients (given sufficient information to deduce at least one root for cubics or at least one complex root or quadratic factor for quartics);',
        'add, subtract, multiply and divide complex numbers in the form x + iy with x and y real;', "demonstrate understanding of and use the terms 'real part' and 'imaginary part';", 'demonstrate understanding of and use the complex conjugate;',
        'demonstrate understanding of and use the fact that non-real roots of polynomial equations with real coefficients occur in conjugate pairs;', 'use and interpret Argand diagrams;', 'demonstrate understanding of and use radian measure for angles; and',
        'demonstrate understanding of and use the modulus-argument form of a complex number.', 'convert between the Cartesian form and the modulus-argument form of a complex number (knowledge of radians is assumed);', 'multiply and divide complex numbers in modulus-argument form;',
        'construct and interpret simple loci in the Argand diagram such as |z − a| = r, |z − a| = |z − b| and arg(z − a) = θ']),
      points: [['f1_cx', 'core', 'Complex numbers: arithmetic, conjugates & quadratics', '', ['C1', 'C3', 'C4', 'C5']], ['f1_poly', 'core', 'Cubic & quartic equations; conjugate pairs', '', ['C2', 'C6']],
        ['f1_argand', 'core', 'Argand diagrams & the modulus–argument form', '', ['C7', 'C8', 'C9', 'C10']], ['f1_mularg', 'core', 'Multiplying & dividing in modulus–argument form', '', ['C11']], ['cx4', 'core', 'Loci in the Argand diagram', '', ['C12']]] },
    { id: 'f1-mx', code: 'M', title: 'Matrices', icon: '▦', color: '#a2845e', blurb: 'Matrix algebra, 2D transformations, invariance, determinants, inverses and linear systems.',
      outcomes: numbered('M', ['add, subtract and multiply conformable matrices;', 'multiply a matrix by a scalar;', 'demonstrate understanding of and use zero and identity matrices;', 'use matrices to represent linear transformations in 2D;',
        'demonstrate understanding of and use matrices to represent successive transformations;', 'find invariant points and lines for a linear transformation in 2D;', 'calculate determinants of 2 × 2 and 3 × 3 matrices;',
        'interpret the determinant of a 2 × 2 matrix as the scale factor of a linear transformation;', 'demonstrate understanding of the implication of the zero value of the determinant of a simple 2 × 2 transformation matrix;',
        'demonstrate understanding of and use singular and non-singular matrices; and', 'demonstrate understanding of and use the properties of inverse matrices.', 'calculate and use the inverse of a non-singular 2 × 2 or 3 × 3 matrix;',
        'solve systems of simultaneous linear equations in two or three variables, including use of the inverse of the coefficient matrix to solve a system of equations with a unique solution and determination of the solution set when the solution exists but is not unique;',
        'demonstrate understanding of the significance of the zero value of the determinant of the coefficient matrix of a system of simultaneous linear equations;', 'interpret geometrically the solution and failure of solution of three simultaneous linear equations;']),
      points: [['f1_mat', 'core', 'Matrix arithmetic; zero & identity matrices', '', ['M1', 'M2', 'M3']], ['f1_tr', 'core', 'Linear transformations & successive transformations', '', ['M4', 'M5']], ['f1_invar', 'core', 'Invariant points & invariant lines', '', ['M6']],
        ['f1_det', 'core', 'Determinants, area scale factor & singular matrices', '', ['M7', 'M8', 'M9', 'M10']], ['mx1', 'core', '3×3 determinants; inverse matrices & their properties', '', ['M7', 'M11', 'M12']], ['mx4', 'core', 'Linear systems & the geometry of three planes', '', ['M13', 'M14', 'M15']]] },
    { id: 'f1-vc', code: 'V', title: 'Vectors', icon: '→', color: '#00a896', blurb: 'Vectors in 3D, lines and planes, intersections, angles, distances and the vector product.',
      outcomes: numbered('V', ['use vectors in three dimensions (including i, j and k unit vectors);', 'demonstrate understanding of and use the vector and Cartesian forms of an equation of a straight line in 3D;', 'demonstrate understanding of and use the vector and Cartesian forms of the equation of a plane;',
        'calculate the scalar product and use it to express the equation of a plane, and to calculate the angle between two lines, the angle between two planes and the angle between a line and a plane;', 'check whether vectors are perpendicular by using the scalar product;',
        'find the intersection of two lines or a line and a plane;', 'demonstrate understanding of and work with skew lines;', 'calculate the perpendicular distance between two lines, from a point to a line and from a point to a plane; and', 'find the equation of the line of intersection of two planes.',
        'calculate the vector product of two vectors, including link to a 3 × 3 determinant (vector triple product is excluded);', 'demonstrate understanding of and use the properties of the vector product; and', 'interpret |a × b| as an area and a.b × c as a volume.']),
      points: [['f1_v3', 'core', 'Vectors in 3D & the scalar product', '', ['V1', 'V4', 'V5']], ['f1_line', 'core', 'Lines in 3D: equations, intersections & skew lines', '', ['V2', 'V6', 'V7']],
        ['vc2', 'core', 'Planes; intersections with lines and other planes', '', ['V3', 'V4', 'V6', 'V9']], ['vc3', 'core', 'Angles & perpendicular distances', '', ['V4', 'V8']], ['vc1', 'core', 'The vector product: areas & volumes', '', ['V10', 'V11', 'V12']]] },
  ],
});

const FORMULAE_F1 = [
  { t: 'Roots of quadratics', c: '#af52de', f: [
    ['Sum and product', T`ax^2+bx+c=0:\quad\alpha+\beta=-\frac ba,\quad\alpha\beta=\frac ca`, '', 'f1_roots'],
    ['Symmetric functions', T`\alpha^2+\beta^2=(\alpha+\beta)^2-2\alpha\beta,\quad\alpha^3+\beta^3=(\alpha+\beta)^3-3\alpha\beta(\alpha+\beta)`, '', 'f1_roots'],
    ['Equation from roots', T`x^2-(\alpha+\beta)x+\alpha\beta=0`, '', 'f1_trans'],
  ] },
  { t: 'Complex numbers', c: '#007aff', f: [
    ['Conjugate', T`z=x+iy,\ z^*=x-iy,\quad zz^*=|z|^2`, '', 'f1_cx'],
    ['Division', T`\frac{a+bi}{c+di}=\frac{(a+bi)(c-di)}{c^2+d^2}`, '', 'f1_cx'],
    ['Conjugate pairs', T`(x-(p+qi))(x-(p-qi))=x^2-2px+p^2+q^2`, 'real coefficients', 'f1_poly'],
    ['Modulus–argument', T`z=r(\cos\theta+i\sin\theta),\quad r=\sqrt{x^2+y^2},\quad-\pi\lt\theta\le\pi`, '', 'f1_argand'],
    ['Products and quotients', T`|zw|=|z||w|,\ \arg(zw)=\arg z+\arg w;\quad\left|\tfrac zw\right|=\tfrac{|z|}{|w|},\ \arg\tfrac zw=\arg z-\arg w`, '', 'f1_mularg'],
    ['Loci', T`|z-a|=r\ \text{circle};\quad|z-a|=|z-b|\ \text{bisector};\quad\arg(z-a)=\theta\ \text{half-line}`, '', 'cx4'],
  ] },
  { t: 'Matrices', c: '#a2845e', f: [
    ['Rotation', T`\begin{pmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{pmatrix}`, 'anticlockwise about O', 'f1_tr'],
    ['Reflection', T`\begin{pmatrix}\cos2\theta&\sin2\theta\\\sin2\theta&-\cos2\theta\end{pmatrix}`, 'in y = x tan θ', 'f1_tr'],
    ['Successive', T`\mathbf A\text{ then }\mathbf B\ \to\ \mathbf{BA}`, '', 'f1_tr'],
    ['2×2 determinant & inverse', T`\det=ad-bc,\qquad\mathbf M^{-1}=\frac1{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}`, '', 'f1_det'],
    ['Area scale factor', T`\text{image area}=|\det\mathbf M|\times\text{object area}`, '', 'f1_det'],
    ['3×3 inverse', T`\mathbf A^{-1}=\frac1{\det\mathbf A}\operatorname{adj}\mathbf A`, 'adj = transposed cofactors', 'mx1'],
    ['Inverse of a product', T`(\mathbf{AB})^{-1}=\mathbf B^{-1}\mathbf A^{-1},\quad\det(\mathbf{AB})=\det\mathbf A\det\mathbf B`, '', 'mx1'],
  ] },
  { t: 'Vectors', c: '#00a896', f: [
    ['Scalar product', T`\mathbf a\cdot\mathbf b=a_1b_1+a_2b_2+a_3b_3=|\mathbf a||\mathbf b|\cos\theta`, '', 'f1_v3'],
    ['Line', T`\mathbf r=\mathbf a+\lambda\mathbf d;\quad\frac{x-a_1}{d_1}=\frac{y-a_2}{d_2}=\frac{z-a_3}{d_3}`, '', 'f1_line'],
    ['Plane', T`\mathbf r\cdot\mathbf n=\mathbf a\cdot\mathbf n;\quad n_1x+n_2y+n_3z=d`, '', 'vc2'],
    ['Vector product', T`\mathbf a\times\mathbf b=\begin{vmatrix}\mathbf i&\mathbf j&\mathbf k\\a_1&a_2&a_3\\b_1&b_2&b_3\end{vmatrix},\quad|\mathbf a\times\mathbf b|=|\mathbf a||\mathbf b|\sin\theta`, '', 'vc1'],
    ['Area & volume', T`\text{triangle}=\tfrac12|\mathbf a\times\mathbf b|;\quad\text{parallelepiped}=|\mathbf a\cdot\mathbf b\times\mathbf c|`, '', 'vc1'],
    ['Point to plane', T`\frac{|n_1x_1+n_2y_1+n_3z_1-d|}{\sqrt{n_1^2+n_2^2+n_3^2}}`, '', 'vc3'],
    ['Skew lines', T`\frac{|(\mathbf b-\mathbf a)\cdot(\mathbf d_1\times\mathbf d_2)|}{|\mathbf d_1\times\mathbf d_2|}`, '', 'vc3'],
  ] },
];
