<script>
	export let title = '';
	export let description = 'My personal website';

	const siteName = 'Calum';
</script>

<svelte:head>
	<title>{title ? title + ' | ' : ''}{siteName}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:type" content="website" />
	<meta name="theme-color" content="#028388" />
</svelte:head>
