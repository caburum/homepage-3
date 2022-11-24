import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const themes = [
	{
		id: 'dark',
		name: 'Dark mode',
		icon: '🌒',
		button: 'Join the dark side'
	},
	{
		id: 'light',
		name: 'Light mode',
		icon: '☀️',
		button: 'Burn your eyes'
	}
];

export const theme = writable(
	(browser &&
		(window.localStorage.getItem('theme') ||
			(window.matchMedia('(prefers-color-scheme: light)').matches && 'light'))) ||
		'dark'
);

theme.subscribe((newTheme) => {
	if (!browser) return;

	window.localStorage.setItem('theme', newTheme);

	document.documentElement.classList.add('theme-' + newTheme);
	document.documentElement.classList.forEach((className) => {
		if (className !== 'theme-' + newTheme && className.startsWith('theme-'))
			document.documentElement.classList.remove(className);
	});
});
