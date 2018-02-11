// import resolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';
import eslint from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
	// browser-friendly UMD build
	{
		entry: 'src/main.js',
		dest: pkg.main,
		format: 'umd',
		moduleName: 'viewObserver',
		plugins: [
			eslint(),
			// resolve(), // so Rollup can find `ms`
			babel({
				exclude: ['node_modules/**']
			})
		]
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// the `targets` option which can specify `dest` and `format`)
	{
		entry: 'src/main.js',
		targets: [
			{ dest: pkg.module, format: 'es' }
		],
		plugins: [
			eslint(),
			babel({
				exclude: ['node_modules/**']
			})
		]
	}
];