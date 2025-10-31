const { PurgeCSS } = require('purgecss');

async function checkUnusedCSS() {
  const purgeCSS = new PurgeCSS();
  const result = await purgeCSS.purge({
    content: [
      'pages/**/*.{js,jsx,ts,tsx}',
      'components/**/*.{js,jsx,ts,tsx}',
      'app/**/*.{js,jsx,ts,tsx}',
      'lib/**/*.{js,jsx,ts,tsx}',
      'content/**/*.{js,jsx,ts,tsx}',
      'data/**/*.{js,jsx,ts,tsx}',
    ],
    css: ['styles/**/*.css'],
    safelist: {
      standard: [/^:/, /^data-/, /^aria-/],
    },
    rejected: true, // Log rejected selectors
  });

  console.log('Rejected selectors:', result[0].rejected);
}

checkUnusedCSS().catch(console.error);