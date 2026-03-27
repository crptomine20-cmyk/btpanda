<script lang="ts">
    let { 
        title = "BitPanda - The Future of Investment", 
        description = "BitPanda, invest in everything. Crypto, Stocks, Metals and more.",
    } = $props();
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
</svelte:head>