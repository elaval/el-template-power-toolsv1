import typescript from 'rollup-plugin-typescript';
import npm from "rollup-plugin-node-resolve";
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';

export default {
  entry: './src/prototype.ts',
  plugins: [
    typescript({
      typescript: require('typescript')
    }),
    commonjs({
			include: './node_modules/**',
			exclude: ['./node_modules/rxjs-es/**','./node_modules/moment/**', './node_modules/lodash-es/**']
		}),
    npm({jsnext: true}),
    babel({
      exclude: ['./node_modules/**'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'development' )
    })
  ],
  moduleName: "App",
  format: "umd",
  targets: [
    { dest: './js/App.js', format: 'umd'}
  ]
};

