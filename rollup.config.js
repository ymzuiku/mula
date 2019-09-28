const rollupTypescript = require('rollup-plugin-typescript2');
const { uglify } = require('rollup-plugin-uglify');

module.exports = [
  {
    input: './src/index.ts',
    output: {
      file: './umd/index.umd.js',
      format: 'umd',
      name: 'mula',
      sourcemap: true,
      globals: {
        'querystring-number': 'queryString',
        react: 'React',
        'react-dom': 'ReactDOM',
        immer: 'immer',
      },
    },
    plugins: [
      rollupTypescript({
        useTsconfigDeclarationDir: false,
      }),
      uglify({
        sourcemap: true,
      }),
    ],
  },
];
