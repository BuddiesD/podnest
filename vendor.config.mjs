// PodNest vendor asset copy — third-party browser assets are served from the
// panel itself rather than a CDN, so the CSP can stay at 'self'
import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';

const out = 'web/static/vendor';
const nm = 'node_modules';

// start clean so a removed or renamed upstream file never lingers
rmSync(out, { recursive: true, force: true });

const copy = (src, dst) => {
    mkdirSync(dirname(join(out, dst)), { recursive: true });
    cpSync(join(nm, src), join(out, dst));
};

// uikit
copy('uikit/dist/css/uikit.min.css', 'uikit/uikit.min.css');
copy('uikit/dist/js/uikit.min.js', 'uikit/uikit.min.js');
copy('uikit/dist/js/uikit-icons.min.js', 'uikit/uikit-icons.min.js');

// scalar api reference — the self-contained browser build
copy('@scalar/api-reference/dist/browser/standalone.js', 'scalar/standalone.js');

// chart.js
copy('chart.js/dist/chart.umd.min.js', 'chartjs/chart.umd.min.js');

// codemirror 5 core, theme, mode autoloader, and every mode's scripts
copy('codemirror/lib/codemirror.js', 'codemirror/lib/codemirror.js');
copy('codemirror/lib/codemirror.css', 'codemirror/lib/codemirror.css');
copy('codemirror/theme/material-darker.css', 'codemirror/theme/material-darker.css');
copy('codemirror/addon/mode/loadmode.js', 'codemirror/addon/mode/loadmode.js');
cpSync(join(nm, 'codemirror/mode'), join(out, 'codemirror/mode'), {
    recursive: true,
    filter: (src) => !/\.(html|css)$/.test(src),
});

// fonts — latin subset, only the weights the panel uses
const fonts = {
    'orbitron': [700, 900],
    'space-grotesk': [400, 500, 600, 700],
    'jetbrains-mono': [400, 500, 600],
};
for (const [family, weights] of Object.entries(fonts)) {
    for (const w of weights) {
        copy(`@fontsource/${family}/files/${family}-latin-${w}-normal.woff2`, `fonts/${family}-latin-${w}-normal.woff2`);
    }
}

// the panel's @font-face rules, standalone for pages that do not load app.css
cpSync('web/static/src/css/fonts.css', join(out, 'fonts/fonts.css'));
