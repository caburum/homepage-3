import adapter from '@sveltejs/adapter-auto';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
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
