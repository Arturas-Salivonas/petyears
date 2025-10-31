const plugins = [
  'autoprefixer',
];

if (process.env.NODE_ENV === 'production') {
  plugins.push('cssnano');
}

const config = {
  plugins,
};

export default config;
