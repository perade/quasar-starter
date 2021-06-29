/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli/quasar-conf-js

/* eslint-env node */
const path = require('path');

const ESLintPlugin = require('eslint-webpack-plugin');
const { configure } = require('quasar/wrappers');

module.exports = configure(function (ctx) {
	return {
		// https://v2.quasar.dev/quasar-cli/supporting-ts
		supportTS: false,

		// https://v2.quasar.dev/quasar-cli/prefetch-feature
		// preFetch: true,

		// app boot file (/src/boot)
		// --> boot files are part of "main.js"
		// https://v2.quasar.dev/quasar-cli/boot-files
		boot: ['i18n', 'axios'],

		// https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
		css: ['app.scss'],

		// https://github.com/quasarframework/quasar/tree/dev/extras
		extras: [
			// 'ionicons-v4',
			// 'mdi-v5',
			// 'fontawesome-v5',
			// 'eva-icons',
			// 'themify',
			// 'line-awesome',
			// 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

			'roboto-font', // optional, you are not bound to it
			'material-icons', // optional, you are not bound to it
		],

		// Full list of options: https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
		build: {
			vueRouterMode: 'history', // available values: 'hash', 'history'

			// transpile: false,

			// Add dependencies for transpiling with Babel (Array of string/regex)
			// (from node_modules, which are by default not transpiled).
			// Applies only if "transpile" is set to true.
			// transpileDependencies: [],

			// rtl: true, // https://v2.quasar.dev/options/rtl-support
			// preloadChunks: true,
			// showProgress: false,

			// Note: filename 을 아래 형태로 선언해야 빌드 시 에러가 발생하지 않음.
			// https://github.com/webpack-contrib/compression-webpack-plugin#filename
			gzip: { filename: '[path][base].gz' },
			analyze: ctx.debug,

			// Options below are automatically set depending on the env, set them if you want to override
			// extractCSS: false,

			// https://v2.quasar.dev/quasar-cli/handling-webpack
			// "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
			chainWebpack(chain) {
				chain.plugin('eslint-webpack-plugin').use(ESLintPlugin, [{ extensions: ['js', 'vue'] }]);

				// usage: import store from '~/store';
				chain.resolve.alias.set('~', path.resolve(__dirname, './src'));

				chain.optimization.splitChunks({
					maxSize: 200000,
					cacheGroups: {
						defaultVendors: {
							name: 'vendor',
							chunks: 'all',
							priority: -10,
							test: /[\\/]node_modules[\\/]/,
						},
						common: {
							name: `chunk-common`,
							minChunks: 2,
							priority: -20,
							chunks: 'all',
							reuseExistingChunk: true,
						},
					},
				});
			},
		},

		// Full list of options: https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
		devServer: {
			https: false,
			port: 8080,
			open: true, // opens browser window automatically
		},

		// https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
		framework: {
			config: {
				cordova: {
					// add the dynamic top padding on iOS mobile devices
					iosStatusBarPadding: false,

					// Quasar handles app exit on mobile phone back button.
					// Requires Quasar v1.9.3+ for true/false, v1.12.6+ for '*' wildcard and array values
					backButtonExit: false, // true | false | ['/home']

					// On the other hand, the following completely
					// disables Quasar's back button management.
					// Requires Quasar v1.14.1+
					backButton: false,
				},
			},
		},

		// animations: 'all', // --- includes all animations
		// https://v2.quasar.dev/options/animationsapp
		animations: [],

		// Full list of options: https://v2.quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
		cordova: {
			// noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
		},

		// Full list of options: https://v2.quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
		electron: {
			bundler: 'packager', // 'packager' or 'builder'

			packager: {
				// https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
				// OS X / Mac App Store
				// appBundleId: '',
				// appCategoryType: '',
				// osxSign: '',
				// protocol: 'myapp://path',
				// Windows only
				// win32metadata: { ... }
			},

			builder: {
				// https://www.electron.build/configuration/configuration

				appId: 'frontend-starter',
			},

			// "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
			chainWebpackMain(chain) {
				chain.plugin('eslint-webpack-plugin').use(ESLintPlugin, [{ extensions: ['js'] }]);
			},

			// "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
			chainWebpackPreload(chain) {
				chain.plugin('eslint-webpack-plugin').use(ESLintPlugin, [{ extensions: ['js'] }]);
			},
		},
	};
});
