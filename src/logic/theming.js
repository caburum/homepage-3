import { writable } from 'svelte/store';
import { browser } from '$app/environment';

import DarkModeIcon from '@material-design-icons/svg/filled/dark_mode.svg?component';
import LightModeIcon from '@material-design-icons/svg/filled/light_mode.svg?component';

export const themes = [
	{
		id: 'dark',
		name: 'Dark mode',
		icon: DarkModeIcon,
		action: 'Join the dark side'
	},
	{
		id: 'light',
		name: 'Light mode',
		icon: LightModeIcon,
		action: 'Set your eyes on fire'
	}
];

export const theme = writable(
	(browser &&
		((themes.map((t) => t.id).includes(window.localStorage.getItem('theme') || '') &&
			window.localStorage.getItem('theme')) ||
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
