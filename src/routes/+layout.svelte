<script>
	/** @type {import('./$types').LayoutData} */
	// export let data;

	import { themes, theme } from 'logic/theming';
	let /** @type {typeof themes[0]} */ nextTheme,
		/** @type {typeof themes[0]} */ currentTheme,
		/** @type {HTMLDivElement} */ themeIcon;
	$: {
		currentTheme =
			themes.filter((item, index) => {
				if (item.id === $theme) {
					nextTheme = themes.length - 1 === index ? themes[0] : themes[index + 1];
					return true;
				}
				return false;
			})[0] || themes[0];
		if (themeIcon) {
			themeIcon.classList.remove('animate');
			themeIcon.classList.add('animate');
		}
	}
	let doNextTheme = () => ($theme = nextTheme.id);

	import CLogo from 'assets/c.svg?component';
	// import HomeIcon from '@material-design-icons/svg/filled/home.svg?component';

	import 'styles/global.scss';
</script>

<header>
	<CLogo class="logo" />
	<nav>
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="https://github.com/caburum">GitHub</a></li>
			<li><a href="https://youtube.com/@caburum">YouTube</a></li>
			<li><a href="https://community.fandom.com/wiki/User:Caburum">Fandom</a></li>
			<li>
				<div
					aria-label={currentTheme.name}
					title={nextTheme.action}
					role="button"
					tabindex="0"
					on:click={doNextTheme}
					on:keypress={doNextTheme}
				>
					{#key $theme}
						<div class="themeIcon" bind:this={themeIcon}>
							<svelte:component this={currentTheme.icon} />
						</div>
					{/key}
				</div>
			</li>
		</ul>
	</nav>
</header>

<div class="wrapper">
	<main id="content">
		<slot />
	</main>
</div>

<style lang="scss">
	header {
		height: 64px;
		padding: 8px clamp(0px, 16em, 4vw);
		display: flex;
		align-items: center;

		:global(svg) {
			height: 100%;
			fill: currentColor;
			transition: fill var(--theme-transition);
			box-sizing: border-box;
		}
		:global(svg.logo) {
			padding: 8px;
			overflow: visible;
			:global(path) {
				stroke: currentColor;
				stroke-width: 3;
			}

			padding-right: 1em;
		}
	}
	nav {
		margin-left: auto;

		ul {
			list-style: none;
			padding: 0;
			margin: 0;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			flex-wrap: wrap;
			gap: 0.75em;

			a {
				text-decoration: none;
				font-weight: 500;
			}
			:global(svg),
			div {
				display: flex;
			}
		}
	}
	.themeIcon {
		transition: transform 650ms ease;
		animation: themeSpin 650ms ease;
		cursor: pointer;
	}
	@keyframes themeSpin {
		0% {
			transform: rotate(-360deg);
		}
	}

	.wrapper {
		padding: 1rem;
		width: 100%;
		box-sizing: border-box;
		pointer-events: painted;
		display: flex;
		justify-content: center;
		padding-top: 0;
	}
	#content {
		width: 100%;
		max-width: 900px;
	}
</style>
