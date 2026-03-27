<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import Icon from '@iconify/svelte';

    // Mock Data (Hardcoded as per requirements)
    const walletBalance = "320,941.01";
    const profitBalance = "100,367.21";
    
    // Deposit History Data provided by user
    // Sorted by date descending (Newest first)
    // Parsed dates for sorting purposes, string for display
    const allTransactions = [
        { date: 'March 20, 2026', amount: '342.86', currency: 'BTC' },
        { date: 'March 13, 2026', amount: '107.50', currency: 'BTC' },
        { date: 'March 6, 2026', amount: '390.62', currency: 'BTC' },
        { date: 'February 27, 2026', amount: '97.69', currency: 'BTC' },
        { date: 'February 27, 2026', amount: '195.45', currency: 'BTC' },
        { date: 'February 20, 2026', amount: '295.40', currency: 'BTC' },
        { date: 'February 14, 2026', amount: '294.12', currency: 'BTC' },
        { date: 'February 7, 2026', amount: '197.01', currency: 'CAD (BTC Eq.)' },
        { date: 'February 2, 2026', amount: '343.32', currency: 'CAD (BTC Eq.)' },
        { date: 'Jan 31, 2026', amount: '68.60', currency: 'CAD' },
        { date: 'Jan 26, 2026', amount: '245.07', currency: 'CAD' },
        { date: 'Jan 20, 2026', amount: '98.27', currency: 'CAD' },
        { date: 'Jan 19, 2026', amount: '196.10', currency: 'CAD' },
        { date: 'Jan 7, 2026', amount: '196.14', currency: 'CAD' },
        { date: 'Jan 3, 2026', amount: '147.80', currency: 'CAD' },
        { date: 'December 29, 2025', amount: '294.16', currency: 'CAD' },
        { date: 'December 26, 2025', amount: '98.03', currency: 'CAD' },
        { date: 'November 11, 2025', amount: '393.32', currency: 'CAD' },
        { date: 'November 10, 2025', amount: '291.27', currency: 'CAD' },
        { date: 'November 6, 2025', amount: '101.90', currency: 'CAD' },
        { date: 'November 5, 2025', amount: '293.24', currency: 'CAD' },
        { date: 'October 31, 2025', amount: '53.63', currency: 'CAD' },
        { date: 'October 22, 2025', amount: '145.40', currency: 'CAD' },
        { date: 'October 16, 2025', amount: '96.99', currency: 'CAD' },
        { date: 'October 9, 2025', amount: '97.56', currency: 'CAD' },
        { date: 'October 3, 2025', amount: '97.46', currency: 'CAD' },
        { date: 'September 16, 2025', amount: '97.20', currency: 'CAD' },
    ];

    // Take top 5 for dashboard
    const recentTransactions = allTransactions.slice(0, 5).map((tx, index) => ({
        id: index,
        type: 'Deposit', 
        asset: tx.currency, 
        amount: tx.amount, 
        value: tx.amount, 
        date: tx.date, 
        status: 'Completed', 
        icon: 'mdi:bank-transfer-in'
    }));


    let showContent = false;
    let hasUnreadNotifications = true;

    onMount(() => {
        showContent = true;

        // Check for unread notifications
        // In a real app we'd fetch from API, here we check against the hardcoded ID we know exists (ID: 1)
        const readNotifications = JSON.parse(localStorage.getItem('readNotifications') || '[]');
        if (readNotifications.includes(1)) {
            hasUnreadNotifications = false;
        }
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
                            <div class="w-10 h-10 rounded-full flex items-center justify-center bg-secondary/20 text-secondary">
                                <Icon icon={tx.icon} class="text-xl" />
                            </div>
                            <div>
                                <p class="text-white font-medium group-hover:text-secondary transition-colors">{tx.type} {tx.asset}</p>
                                <p class="text-white/40 text-xs">{tx.date}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-medium text-secondary">
                                +${tx.value}
                            </p>
                            <p class="text-xs text-green-400">
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
