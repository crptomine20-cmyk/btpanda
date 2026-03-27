<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import Icon from '@iconify/svelte';
    import { goto } from '$app/navigation';

    // Transaction Data
    // Added Pending Withdrawal as requested
    const allTransactions = [
        { date: 'Jan 31, 2026', amount: '68.60', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'Jan 26, 2026', amount: '245.07', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'Jan 20, 2026', amount: '98.27', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'Jan 19, 2026', amount: '196.10', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'Jan 7, 2026', amount: '196.14', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'Jan 3, 2026', amount: '147.80', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'December 29, 2025', amount: '294.16', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'December 26, 2025', amount: '98.03', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        
        // Pending Withdrawal
        { 
            date: 'Dec 22 2025', 
            amount: '43,000.00', 
            currency: 'USD', 
            type: 'Withdrawal', 
            status: 'Processing',
            details: {
                address: '0x952ca14de93a4294743c049CdA19AB45CD8fD49B',
                note: 'from accumulated profits'
            }
        },

        { date: 'November 11, 2025', amount: '393.32', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'November 10, 2025', amount: '291.27', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'November 6, 2025', amount: '101.90', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'November 5, 2025', amount: '293.24', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'October 31, 2025', amount: '53.63', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'October 22, 2025', amount: '145.40', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'October 16, 2025', amount: '96.99', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'October 9, 2025', amount: '97.56', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'October 3, 2025', amount: '97.46', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'September 16, 2025', amount: '97.20', currency: 'CAD', type: 'Deposit', status: 'Completed' },
    ];

    let activeFilter = 'All'; // 'All', 'Deposit', 'Withdrawal'
    let showContent = false;

    $: filteredTransactions = allTransactions.filter(tx => {
        if (activeFilter === 'All') return true;
        return tx.type === activeFilter;
    });

    function getIcon(tx: any) {
        if (tx.type === 'Withdrawal') return 'mdi:bank-transfer-out';
        return 'mdi:bank-transfer-in';
    }

    function handleTransactionClick(tx: any) {
        if (tx.type === 'Withdrawal') {
            goto('/withdrawal');
        }
    }

    onMount(() => {
        showContent = true;
    });
</script>

<svelte:head>
    <title>Transactions | Bitpanda</title>
</svelte:head>

{#if showContent}
<div class="min-h-screen bg-surface-dark pb-24 pt-8" in:fade={{ duration: 300 }}>
    <div class="container mx-auto space-y-8">
        
        <!-- Header -->
        <header class="flex items-center gap-4 mb-8 px-2">
            <a href="/dashboard" class="btn-ghost p-2 rounded-full hover:bg-white/10 transition-colors">
                <Icon icon="mdi:arrow-left" class="text-2xl text-white" />
            </a>
            <div>
                <h1 class="text-3xl font-bold text-white mb-1">Transactions</h1>
                <p class="text-white/60">Your complete history</p>
            </div>
        </header>

        <!-- Transactions List -->
        <div class="glass-card p-0 overflow-hidden" in:fly={{ y: 20, delay: 100, duration: 500 }}>
             <!-- Filter Tabs -->
            <div class="p-4 border-b border-white/5 flex gap-2 overflow-x-auto">
                 <button 
                    class={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-colors ${activeFilter === 'All' ? 'bg-secondary/20 text-secondary border-secondary/20' : 'bg-white/5 text-white/60 border-transparent hover:bg-white/10 hover:text-white'}`}
                    on:click={() => activeFilter = 'All'}
                 >
                    All Transactions
                 </button>
                 <button 
                    class={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-colors ${activeFilter === 'Deposit' ? 'bg-secondary/20 text-secondary border-secondary/20' : 'bg-white/5 text-white/60 border-transparent hover:bg-white/10 hover:text-white'}`}
                    on:click={() => activeFilter = 'Deposit'}
                 >
                    Deposits
                 </button>
                 <button 
                    class={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-colors ${activeFilter === 'Withdrawal' ? 'bg-secondary/20 text-secondary border-secondary/20' : 'bg-white/5 text-white/60 border-transparent hover:bg-white/10 hover:text-white'}`}
                    on:click={() => activeFilter = 'Withdrawal'}
                 >
                    Withdrawals
                 </button>
            </div>

            <div class="max-h-[70vh] overflow-y-auto custom-scrollbar">
                {#each filteredTransactions as tx}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div 
                        class="p-4 flex items-center justify-between border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer group"
                        on:click={() => handleTransactionClick(tx)}
                    >
                        <div class="flex items-center gap-4">
                            <div class={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'Withdrawal' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-secondary/20 text-secondary'}`}>
                                <Icon icon={getIcon(tx)} class="text-xl" />
                            </div>
                            <div>
                                <p class="text-white font-medium group-hover:text-secondary transition-colors">
                                    {tx.type === 'Withdrawal' ? 'Withdrawal Processing' : `${tx.type} ${tx.currency}`}
                                </p>
                                <p class="text-white/40 text-xs">{tx.date}</p>
                                {#if tx.details}
                                    <p class="text-[10px] text-white/30 mt-0.5 font-mono truncate max-w-[150px] sm:max-w-xs">{tx.details.address}</p>
                                {/if}
                            </div>
                        </div>
                        <div class="text-right">
                             <p class={`font-medium ${tx.type === 'Withdrawal' ? 'text-white' : 'text-secondary'}`}>
                                {tx.type === 'Withdrawal' ? '-' : '+'}${tx.amount}
                            </p>
                            <p class={`text-xs ${tx.status === 'Completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                                {tx.status}
                            </p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>

    </div>
</div>
{/if}

<style>
    .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.02);
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.2);
    }
</style>
