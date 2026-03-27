<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import Icon from '@iconify/svelte';

    const wallets = [
        { 
            symbol: 'BTC', 
            name: 'Bitcoin', 
            address: 'bc1qssda26kcf50wtt3afgaf9prd68jjc09d0q73aa', 
            icon: 'mdi:bitcoin',
            color: 'text-orange-500',
            bg: 'bg-orange-500/10'
        },
        { 
            symbol: 'USDT', 
            name: 'Tether', 
            address: '0xF9CAD6D3a8Da2F4124b88d77772385CAB2b1e458', 
            icon: 'cryptocurrency:usdt',
            color: 'text-green-500',
            bg: 'bg-green-500/10'
        },
        { 
            symbol: 'ETH', 
            name: 'Ethereum', 
            address: '0xF9CAD6D3a8Da2F4124b88d77772385CAB2b1e458', 
            icon: 'mdi:ethereum',
            color: 'text-blue-500',
            bg: 'bg-blue-500/10'
        }
    ];

    let copiedAddress: string | null = null;

    function copyToClipboard(address: string) {
        navigator.clipboard.writeText(address);
        copiedAddress = address;
        setTimeout(() => copiedAddress = null, 2000);
    }

    let showContent = false;
    onMount(() => {
        showContent = true;
    });
</script>

<svelte:head>
    <title>Deposit | Bitpanda</title>
</svelte:head>

{#if showContent}
<div class="min-h-screen bg-surface-dark pb-24 pt-8" in:fade={{ duration: 300 }}>
    <div class="container mx-auto space-y-8 px-4">
        
        <!-- Header -->
        <header class="flex items-center gap-4 mb-8">
            <a href="/dashboard" class="btn-ghost p-2 rounded-full hover:bg-white/10 transition-colors">
                <Icon icon="mdi:arrow-left" class="text-2xl text-white" />
            </a>
            <div>
                <h1 class="text-3xl font-bold text-white mb-1">Deposit</h1>
                <p class="text-white/60">Select a wallet to deposit funds</p>
            </div>
        </header>

        <!-- Wallets Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each wallets as wallet, i}
                <div class="glass-card relative group overflow-hidden" in:fly={{ y: 20, delay: i * 100, duration: 500 }}>
                    <div class="flex items-center gap-4 mb-6">
                        <div class={`w-12 h-12 rounded-full flex items-center justify-center ${wallet.bg} ${wallet.color}`}>
                            <Icon icon={wallet.icon} class="text-2xl" />
                        </div>
                        <div>
                            <h3 class="text-lg font-bold text-white">{wallet.name}</h3>
                            <span class="text-xs font-mono text-white/50 bg-white/5 px-2 py-0.5 rounded">{wallet.symbol}</span>
                        </div>
                    </div>

                    <div class="bg-black/30 p-4 rounded-xl border border-white/5 break-all">
                        <p class="text-white/70 font-mono text-sm leading-relaxed">{wallet.address}</p>
                    </div>

                    <button 
                        class="mt-4 w-full btn-outline py-2.5 text-sm flex items-center justify-center gap-2 hover:bg-white/5 border-white/10"
                        on:click={() => copyToClipboard(wallet.address)}
                    >
                        {#if copiedAddress === wallet.address}
                            <Icon icon="mdi:check" class="text-lg text-green-400" />
                            <span class="text-green-400">Copied!</span>
                        {:else}
                            <Icon icon="mdi:content-copy" class="text-lg" />
                            <span>Copy Address</span>
                        {/if}
                    </button>
                </div>
            {/each}
        </div>

        <div class="glass-card mt-8 bg-secondary/5 border-secondary/20">
             <div class="flex gap-4 items-start">
                <Icon icon="mdi:information-outline" class="text-2xl text-secondary shrink-0 mt-0.5" />
                <div class="space-y-2 text-sm text-white/70">
                    <p><strong class="text-white">Important:</strong> Only send the specific asset to its corresponding address. Sending any other asset may result in permanent loss.</p>
                    <p>Deposits will be credited automatically after network confirmation.</p>
                </div>
             </div>
        </div>

    </div>
</div>
{/if}
