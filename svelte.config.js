import adapterAuto from '@sveltejs/adapter-auto';
import adapterCloudflare from '@sveltejs/adapter-cloudflare';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: process.env.CF_PAGES
			? adapterCloudflare({
					routes: {
						include: ['/*'],
						exclude: ['<all>'] // has prerendered pages
					}
				})
			: adapterAuto(),
		alias: {
			assets: 'src/assets/*',
			components: 'src/components/*',
			data: 'src/data/*',
			logic: 'src/logic/*',
			routes: 'src/routes/*',
			styles: 'src/styles/*'
		}
	},
	preprocess: [
		sveltePreprocess({
			postcss: true,
			scss: {
				includePaths: ['src/styles'],
				prependData: `@import './src/styles/mixins.scss';`
			}
		})
	]
};

export default config;
