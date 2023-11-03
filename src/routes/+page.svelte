<script>
	import SEO from 'components/SEO.svelte';

	import projects from 'data/projects.json';

	import GitHubIcon from 'assets/github.svg?component';
	import CodeIcon from 'assets/code.svg?component';
	import GoToIcon from '@material-design-icons/svg/outlined/open_in_new.svg?component';
</script>

<SEO title="Portfolio" />

<main>
	<h1 style:font-size="3em">Hi, I'm Calum, a.k.a Caburum.</h1>
	<p>I'm a student dev, mostly working on web development and robotics.</p>

	<h1>Projects</h1>

	<div class="cards">
		{#each projects as project, index}
			<div
				class="card"
				class:image={project.image}
				style:--image={project.image ? `url(${project.image})` : null}
				style:background-position={project.imagePosition ?? null}
				style:animation-delay={0.1 * Math.pow(index, 0.4) + 's'}
			>
				<h1>{project.title}</h1>
				<p class="desc">{project.desc}</p>
				<p class="lang">{project.lang}</p>
				<div class="icons">
					<!-- todo: this is ugly and i will do something about it (totally) -->
					{#if project.url}
						<a
							href={'https://' + project.url}
							title="View project"
							target="_blank"
							rel="noreferrer"
						>
							<GoToIcon />
						</a>
					{/if}
					{#if project.src}
						<a href={'https://' + project.src} title="View code" target="_blank" rel="noreferrer">
							{#if project.src.startsWith('github')}
								<GitHubIcon />
							{:else}
								<CodeIcon />
							{/if}
						</a>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</main>

<style lang="scss">
	main > * {
		margin: 0.25em 0;
	}
	main > h1:not(:first-child) {
		margin-top: 1em;
	}

	.cards {
		--card-width: 20em;
		--card-height: 11em;
	}

	.card {
		display: grid;
		grid-gap: 0.25rem;
		grid-template-columns: auto min-content;
		grid-template-rows: min-content 1fr max-content;
		grid-template-areas:
			'title icons'
			'subtitle icons'
			'desc icons';

		animation: zoomin 0.5s backwards ease;
		@keyframes zoomin {
			0% {
				transform: scale(0.88);
				opacity: 0;
			}
		}

		&.image {
			background-image: linear-gradient(
					rgba(var(--image-dimmer-color), 0.7) 30%,
					rgba(var(--image-dimmer-color), 0.65) 50%,
					rgba(var(--image-dimmer-color), 0.9)
				),
				var(--image);
			background-position: center;
			background-size: cover;

			* {
				filter: drop-shadow(0 0 2px rgba(var(--image-dimmer-color), 0.5));
			}
		}

		h1 {
			grid-area: title;
			font-size: 1.3em;
			font-weight: 700;
			@include line-clamp(2);
		}

		p {
			margin: 0;
		}

		.desc {
			grid-area: desc;
			@include line-clamp(4);
		}

		.lang {
			grid-area: subtitle;
			font-size: 0.8em;
			font-weight: 500;
			color: var(--text-subtle);
		}

		.icons {
			grid-area: icons;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: flex-end;
			gap: 0.5rem;

			:global(svg) {
				fill: currentColor;
				width: 1.5em;
			}
		}
	}
</style>
