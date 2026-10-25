/* art-kit.js — wspólne klocki do rysowania ilustracji potraw (SVG). */
export const hash = (s) => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return Math.abs(h); };

export const shadow = (cx = 100, cy = 150, rx = 70, ry = 9) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity=".38"/>`;
export const PL_RIM = '#d9d9dd', PL_IN = '#2b2b2e', PL_IN2 = '#343437';
export const plate = (r = 72) => `<ellipse cx="100" cy="${100 + r * 0.14}" rx="${r}" ry="${r * 0.97}" fill="#000" opacity=".4"/>
  <circle cx="100" cy="100" r="${r}" fill="${PL_RIM}"/><circle cx="100" cy="100" r="${r * 0.965}" fill="#bdbdc2"/><circle cx="100" cy="100" r="${r * 0.9}" fill="${PL_IN}"/>
  <circle cx="100" cy="100" r="${r * 0.9}" fill="none" stroke="${PL_IN2}" stroke-width="2.5"/><circle cx="100" cy="100" r="${r * 0.7}" fill="${PL_IN2}" opacity=".35"/>`;
export const leaf = (x, y, a = 0, s = 1, c = '#3f9d4e') => `<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})"><path d="M0 0 C6 -10 18 -10 24 0 C18 10 6 10 0 0Z" fill="${c}"/><path d="M2 0 H22" stroke="#fff" stroke-opacity=".45" stroke-width="1.4"/></g>`;
export const dots = (pts, r, c, o = 1) => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity="${o}"/>`).join('');
export const circ = (x, y, r, f, o = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"${o < 1 ? ` opacity="${o}"` : ''}/>`;
export const ell = (x, y, rx, ry, f, a = 0, o = 1) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${f}"${a ? ` transform="rotate(${a} ${x} ${y})"` : ''}${o < 1 ? ` opacity="${o}"` : ''}/>`;
export const rect = (x, y, w, h, f, r = 0, a = 0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}"${a ? ` transform="rotate(${a} ${x + w / 2} ${y + h / 2})"` : ''}/>`;
export const wedge = (x, y, a = 0, s = 1, c = '#ffd543') => `<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})"><path d="M-22 0 A22 22 0 0 0 22 0Z" fill="${c}"/><path d="M-17 0 A17 17 0 0 0 17 0Z" fill="#fff0a8"/><path d="M0 0 V16 M-8 0 L-5 14 M8 0 L5 14" stroke="${c}" stroke-width="1.6"/></g>`;
export const lemonWheel = (x, y, r = 18, c = '#ffd543') => `${circ(x, y, r, c)}${circ(x, y, r * 0.78, '#fff0a8')}${[0, 60, 120, 180, 240, 300].map((a) => `<path d="M${x} ${y} L${x + r * 0.76 * Math.cos(a * Math.PI / 180)} ${y + r * 0.76 * Math.sin(a * Math.PI / 180)}" stroke="${c}" stroke-width="1.6"/>`).join('')}`;
export const orangeWheel = (x, y, r = 17) => lemonWheel(x, y, r, '#f6a41b').replace(/#fff0a8/, '#ffc94d');
export const bowl = (r = 72, rim = PL_RIM, inner = PL_IN) => `<ellipse cx="100" cy="${100 + r * 0.14}" rx="${r}" ry="${r * 0.97}" fill="#000" opacity=".4"/><circle cx="100" cy="100" r="${r}" fill="${rim}"/><circle cx="100" cy="100" r="${r * 0.95}" fill="#bdbdc2"/><circle cx="100" cy="100" r="${r * 0.88}" fill="${inner}"/>`;
