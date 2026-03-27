<script lang="ts">
    import { market } from '$lib/stores/market.svelte';

    const tickerItems = [
        { key: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
        { key: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
        { key: 'BEST', name: 'Bitpanda Eco', symbol: 'BEST' },
        { key: 'solana', name: 'Solana', symbol: 'SOL' },
        { key: 'cardano', name: 'Cardano', symbol: 'ADA' },
        { key: 'ripple', name: 'XRP', symbol: 'XRP' },
        { key: 'TSLA', name: 'Tesla', symbol: 'TSLA' },
        { key: 'AAPL', name: 'Apple', symbol: 'AAPL' },
    ];
</script>

<div class="w-full bg-surface-dark border-y border-white/5 overflow-hidden py-3">
    <div class="flex whitespace-nowrap animate-ticker">
        {#each [...tickerItems, ...tickerItems, ...tickerItems] as item}
            {@const data = market.data[item.key] || { price: 0, change: 0 }}
            <div class="inline-flex items-center mx-6 space-x-2 text-sm">
                <span class="font-bold text-gray-300">{item.name}</span>
                <span class="text-gray-500 text-xs">{item.symbol}</span>
                <span class="font-mono text-white">€{data.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span class="{data.change >= 0 ? 'text-secondary' : 'text-red-500'} text-xs font-semibold">
                    {data.change >= 0 ? '+' : ''}{data.change.toFixed(1)}%
                </span>
            </div>
        {/each}
    </div>
</div>
