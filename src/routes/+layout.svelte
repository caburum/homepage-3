<script>
	/** @type {import('./$types').LayoutData} */
	// export let data;

	import { themes, theme } from 'logic/theming';
	let /** @type {themes[0]} */ nextTheme, /** @type {themes[0]} */ currentTheme;
	$: {
		currentTheme =
			themes.filter((item, index) => {
				if (item.id === $theme) {
					nextTheme = themes.length - 1 === index ? themes[0] : themes[index + 1];
					return true;
				}
				return false;
			})[0] || themes[0];
	}
	let doNextTheme = () => ($theme = nextTheme.id);

	import CLogo from 'assets/c.svg?component';
	import 'styles/global.scss';
</script>

<header>
	<CLogo class="logo" />
	<nav>
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="https://github.com/caburum">GitHub</a></li>
			<li>
				<div
					class="button accent"
					role="button"
					tabindex="0"
					on:click={doNextTheme}
					on:keypress={doNextTheme}
				>
					{nextTheme.button}
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
			justify-content: space-between;
			gap: 0.75em;

			a {
				text-decoration: none;
				font-weight: 500;
			}
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
