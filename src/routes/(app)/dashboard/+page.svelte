<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import Icon from '@iconify/svelte';

    // Mock Data (Hardcoded as per requirements)
    const walletBalance = "339,283.40";
    const profitBalance = "110,200.00";
    
    import { transactionsStore } from '$lib/stores/transactions.svelte';

    $: recentTransactions = transactionsStore.all.slice(0, 5);

    function getIcon(tx: any) {
        if (tx.type === 'Withdrawal') return 'mdi:bank-transfer-out';
        return 'mdi:bank-transfer-in';
    }


    let showContent = false;
    let hasUnreadNotifications = true;

    onMount(() => {
        showContent = true;

        // Check for unread notifications
        // Notification 2 (withdrawals) uses sessionStorage — shows as unread once per session
        const seenThisSession = sessionStorage.getItem('notif_2_seen');
        if (seenThisSession) {
            // Already visited notifications this session, no badge needed
            hasUnreadNotifications = false;
        }
        // If not seen this session, badge stays true (default)
    });
</script>

<svelte:head>
    <title>Dashboard | Bitpanda</title>
</svelte:head>

{#if showContent}
<div class="min-h-screen bg-surface-dark pb-20 pt-8" in:fade={{ duration: 300 }}>
    <div class="container mx-auto space-y-8">
        
        <!-- Header -->
        <header class="flex items-center justify-between mb-8 px-2">
            <div>
                <h1 class="text-3xl font-bold text-white mb-1">Dashboard</h1>
                <p class="text-white/60">Welcome back, Don Tittle</p>
            </div>
            <a href="/notifications" class="btn-ghost p-2 rounded-full relative hover:bg-white/10 transition-colors">
                <Icon icon="mdi:bell" class="text-2xl text-white/80" />
                {#if hasUnreadNotifications}
                    <span class="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                {/if}
            </a>
        </header>

        <!-- Main Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <!-- Total Wallet Balance -->
            <div class="glass-card relative overflow-hidden group" in:fly={{ y: 20, delay: 100, duration: 500 }}>
                <!-- Background Gradient Effect -->
                <div class="absolute -top-20 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all duration-500"></div>

                <div class="relative z-10">
                    <div class="flex items-center justify-between mb-6">
                        <div class="flex items-center gap-2 text-white/70">
                            <Icon icon="mdi:wallet-outline" class="text-xl" />
                            <span class="text-sm font-medium uppercase tracking-wider">Total Balance</span>
                        </div>
                        <span class="text-xs bg-white/10 px-2 py-1 rounded text-white/60">USDT</span>
                    </div>
                    
                    <div class="mb-6">
                        <h2 class="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                            ${walletBalance}
                        </h2>
                        <p class="text-secondary mt-2 flex items-center gap-1 text-sm font-medium">
                            <Icon icon="mdi:trending-up" />
                            +2.45% <span class="text-white/40 ml-1">this week</span>
                        </p>
                    </div>

                    <div class="flex gap-3 mt-4">
                        <a href="/deposit" class="btn-primary py-2 px-4 text-sm w-full">Deposit</a>
                        <a href="/withdrawal" class="btn-outline py-2 px-4 text-sm w-full border-white/10 hover:bg-white/5">Transfer</a>
                    </div>
                </div>
            </div>

            <!-- Profit Available -->
            <div class="glass-card relative overflow-hidden group" in:fly={{ y: 20, delay: 200, duration: 500 }}>
                 <!-- Background Gradient Effect -->
                 <div class="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500"></div>

                <div class="relative z-10">
                    <div class="flex items-center justify-between mb-6">
                        <div class="flex items-center gap-2 text-white/70">
                            <Icon icon="mdi:safe" class="text-xl" />
                            <span class="text-sm font-medium uppercase tracking-wider">Confirmed Profit</span>
                        </div>
                         <span class="text-xs bg-white/10 px-2 py-1 rounded text-white/60">CAD (BTC Eq.)</span>
                    </div>
                    
                    <div class="mb-6">
                        <h2 class="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                            ${profitBalance}
                        </h2>
                        <p class="text-white/50 mt-2 text-sm">
                            Available for withdrawal
                        </p>
                    </div>

                    <div class="flex gap-3 mt-4">
                        <a href="/withdrawal" class="btn-outline py-2 px-4 text-sm w-full border-secondary/50 text-secondary hover:bg-secondary/10 hover:border-secondary">Withdraw Funds</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Transactions -->
        <div class="space-y-4" in:fly={{ y: 20, delay: 300, duration: 500 }}>
             <div class="flex items-center justify-between px-2">
                <h3 class="text-lg font-semibold text-white">Recent Transactions</h3>
                <a href="/transactions" class="text-sm text-secondary hover:text-white transition-colors">View All</a>
            </div>

            <div class="glass-card p-0 overflow-hidden">
                {#each recentTransactions as tx, i}
                    <div class="p-4 flex items-center justify-between border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer group">
                        <div class="flex items-center gap-4">
                            <div class={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'Withdrawal' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-secondary/20 text-secondary'}`}>
                                <Icon icon={getIcon(tx)} class="text-xl" />
                            </div>
                            <div>
                                <p class="text-white font-medium group-hover:text-secondary transition-colors">
                                    {tx.type === 'Withdrawal' ? 'Withdrawal Processing' : `${tx.type} ${tx.currency}`}
                                </p>
                                <p class="text-white/40 text-xs">{tx.date}</p>
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
