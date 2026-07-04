<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly, scale } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import Icon from '@iconify/svelte';

    const walletBalance = "334,500.00";
    const profitBalance = "147,000.00";
    const profitBalanceNum = 147000.00;

    // Recent withdrawal history
    import { transactionsStore } from '$lib/stores/transactions.svelte';

    $: recentWithdrawals = transactionsStore.withdrawals;

    function formatAddress(address?: string) {
        if (!address) return '';
        if (address.length <= 10) return address;
        return address.slice(0, 6) + '...' + address.slice(-4);
    }

    let showContent = false;
    let isWithdrawing = false;
    let showSecurityDialog = false;
    let withdrawAmount = '';
    let amountError = '';
    let inputTouched = false;

    function parseAmount(val: string): number {
        // Strip commas and whitespace
        const cleaned = val.replace(/,/g, '').trim();
        return parseFloat(cleaned);
    }

    function validateAmount(): boolean {
        inputTouched = true;
        const val = withdrawAmount.trim();

        if (!val) {
            amountError = 'Please enter a withdrawal amount';
            return false;
        }

        const num = parseAmount(val);

        if (isNaN(num)) {
            amountError = 'Please enter a valid number';
            return false;
        }

        if (num <= 0) {
            amountError = 'Amount must be greater than zero';
            return false;
        }

        if (num > profitBalanceNum) {
            amountError = `Amount exceeds your available balance of $${profitBalance}`;
            return false;
        }

        amountError = '';
        return true;
    }

    function handleAmountInput() {
        if (inputTouched) {
            validateAmount();
        }
    }

    function handleWithdraw() {
        if (!validateAmount()) return;

        isWithdrawing = true;
        // Simulate processing
        setTimeout(() => {
            isWithdrawing = false;
            showSecurityDialog = true;
        }, 2500);
    }

    function closeDialog() {
        showSecurityDialog = false;
    }

    onMount(() => {
        showContent = true;
    });
</script>

<svelte:head>
    <title>Withdrawal | Bitpanda</title>
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
                <h1 class="text-3xl font-bold text-white mb-1">Withdraw</h1>
                <p class="text-white/60">Transfer funds to your wallet</p>
            </div>
        </header>

        <!-- Balance Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <!-- Available Balance -->
            <div class="glass-card relative overflow-hidden group" in:fly={{ y: 20, delay: 100, duration: 500 }}>
                <div class="absolute -top-20 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all duration-500"></div>
                
                <div class="relative z-10">
                    <div class="flex items-center justify-between mb-6">
                        <div class="flex items-center gap-2 text-white/70">
                            <Icon icon="mdi:wallet-outline" class="text-xl" />
                            <span class="text-sm font-medium uppercase tracking-wider">Total Balance</span>
                        </div>
                        <span class="text-xs bg-white/10 px-2 py-1 rounded text-white/60">USDT</span>
                    </div>
                    
                    <div>
                        <h2 class="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                            ${walletBalance}
                        </h2>
                        <p class="text-secondary mt-2 flex items-center gap-1 text-sm font-medium">
                            <Icon icon="mdi:trending-up" />
                            +2.45% <span class="text-white/40 ml-1">this week</span>
                        </p>
                    </div>
                </div>
            </div>

            <!-- Withdrawable Profit -->
            <div class="glass-card relative overflow-hidden group" in:fly={{ y: 20, delay: 200, duration: 500 }}>
                <div class="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
                
                <div class="relative z-10">
                    <div class="flex items-center justify-between mb-6">
                        <div class="flex items-center gap-2 text-white/70">
                            <Icon icon="mdi:safe" class="text-xl" />
                            <span class="text-sm font-medium uppercase tracking-wider">Confirmed Profit</span>
                        </div>
                        <span class="text-xs bg-white/10 px-2 py-1 rounded text-white/60">CAD (BTC Eq.)</span>
                    </div>
                    
                    <div>
                        <h2 class="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                            ${profitBalance}
                        </h2>
                        <p class="text-white/50 mt-2 text-sm">
                            Available for withdrawal
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Withdrawal Amount Input -->
        <div class="glass-card" in:fly={{ y: 20, delay: 300, duration: 500 }}>
            <label for="withdraw-amount" class="block text-sm font-medium text-white/70 mb-3">Withdrawal Amount</label>
            <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-lg font-semibold pointer-events-none">$</span>
                <input
                    id="withdraw-amount"
                    type="text"
                    inputmode="decimal"
                    bind:value={withdrawAmount}
                    on:input={handleAmountInput}
                    on:blur={() => { inputTouched = true; validateAmount(); }}
                    placeholder="0.00"
                    class="w-full bg-white/5 border rounded-xl py-4 pl-10 pr-20 text-xl font-bold text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all {amountError && inputTouched ? 'border-red-500/50' : 'border-white/10'}"
                    disabled={isWithdrawing}
                />
                <button
                    type="button"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-secondary bg-secondary/10 px-3 py-1.5 rounded-lg hover:bg-secondary/20 transition-colors"
                    on:click={() => { withdrawAmount = profitBalanceNum.toFixed(2); inputTouched = true; validateAmount(); }}
                >
                    MAX
                </button>
            </div>
            {#if amountError && inputTouched}
                <p class="mt-2 text-red-400 text-sm flex items-center gap-1.5" in:fly={{ y: -5, duration: 200 }}>
                    <Icon icon="mdi:alert-circle-outline" class="text-base shrink-0" />
                    {amountError}
                </p>
            {/if}
            <p class="mt-2 text-white/30 text-xs">Available: <span class="text-white/50">${profitBalance} USDT</span></p>
        </div>

        <!-- Withdraw Button -->
        <div in:fly={{ y: 20, delay: 350, duration: 500 }}>
            <button
                class="btn-primary w-full py-4 text-base font-bold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                on:click={handleWithdraw}
                disabled={isWithdrawing}
                id="withdraw-btn"
            >
                {#if isWithdrawing}
                    <div class="spinner"></div>
                    <span>Processing Withdrawal...</span>
                {:else}
                    <Icon icon="mdi:bank-transfer-out" class="text-xl" />
                    <span>Withdraw Funds</span>
                {/if}
            </button>
        </div>

        <!-- Recent Withdrawals -->
        <div class="space-y-4" in:fly={{ y: 20, delay: 400, duration: 500 }}>
            <div class="flex items-center justify-between px-1">
                <h3 class="text-lg font-semibold text-white">Recent Withdrawals</h3>
                <a href="/transactions" class="text-sm text-secondary hover:text-white transition-colors">View All</a>
            </div>

            <div class="glass-card p-0 overflow-hidden">
                {#each recentWithdrawals as withdrawal}
                    <div class="p-4 flex items-center justify-between border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer group">
                        <div class="flex items-center gap-4">
                            <div class="w-10 h-10 rounded-full flex items-center justify-center bg-yellow-500/20 text-yellow-500">
                                <Icon icon="mdi:bank-transfer-out" class="text-xl" />
                            </div>
                            <div>
                                <p class="text-white font-medium group-hover:text-secondary transition-colors">Withdrawal {withdrawal.currency}</p>
                                <p class="text-white/40 text-xs">{withdrawal.date}</p>
                                <p class="text-[10px] text-white/30 mt-0.5 font-mono">{formatAddress(withdrawal.details?.address)}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-medium text-white">
                                -${withdrawal.amount}
                            </p>
                            <p class="text-xs text-yellow-400 flex items-center gap-1 justify-end">
                                <span class="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></span>
                                {withdrawal.status}
                            </p>
                        </div>
                    </div>
                {/each}

                {#if recentWithdrawals.length === 0}
                    <div class="p-8 text-center text-white/40">
                        <Icon icon="mdi:history" class="text-4xl mb-2 mx-auto opacity-50" />
                        <p class="text-sm">No withdrawal history</p>
                    </div>
                {/if}
            </div>
        </div>

        <!-- Info Card -->
        <div class="glass-card bg-secondary/5 border-secondary/20" in:fly={{ y: 20, delay: 500, duration: 500 }}>
            <div class="flex gap-4 items-start">
                <Icon icon="mdi:information-outline" class="text-2xl text-secondary shrink-0 mt-0.5" />
                <div class="space-y-2 text-sm text-white/70">
                    <p><strong class="text-white">Withdrawal Info:</strong> Withdrawals are processed within 1-3 business days. A minimum withdrawal amount may apply depending on network conditions.</p>
                    <p>For any issues, please contact <a href="/support" class="text-secondary hover:underline">support</a>.</p>
                </div>
            </div>
        </div>

    </div>
</div>
{/if}

<!-- Security Deposit Dialog Overlay -->
{#if showSecurityDialog}
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div 
    class="fixed inset-0 z-[100] flex items-center justify-center p-4"
    in:fade={{ duration: 200 }}
    out:fade={{ duration: 150 }}
>
    <!-- Backdrop -->
    <div 
        class="absolute inset-0 bg-black/80 backdrop-blur-sm"
        on:click={closeDialog}
    ></div>

    <!-- Dialog -->
    <div 
        class="relative z-10 w-full max-w-md glass rounded-3xl p-8 border border-white/10 shadow-2xl shadow-black/60"
        in:scale={{ duration: 300, start: 0.9, easing: cubicOut }}
        out:scale={{ duration: 150, start: 0.9 }}
    >
        <!-- Close Button -->
        <button 
            class="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-1"
            on:click={closeDialog}
        >
            <Icon icon="mdi:close" class="text-xl" />
        </button>

        <!-- Shield Icon with Glow -->
        <div class="relative mx-auto w-20 h-20 mb-6 flex items-center justify-center">
            <div class="absolute inset-0 bg-yellow-500/20 blur-2xl rounded-full animate-pulse"></div>
            <div class="relative w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center border border-yellow-500/30">
                <Icon icon="mdi:shield-lock-outline" class="text-4xl text-yellow-500" />
            </div>
        </div>

        <h2 class="text-xl font-bold text-white text-center mb-2">Security Deposit Required</h2>
        <p class="text-white/60 text-sm text-center mb-6 leading-relaxed">
            To secure your withdrawal and comply with our anti-fraud verification protocols, a refundable security deposit is required before processing.
        </p>

        <!-- Deposit Amount -->
        <div class="bg-white/5 rounded-2xl p-5 border border-white/10 mb-6">
            <div class="flex items-center justify-between mb-2">
                <span class="text-white/50 text-sm">Required Deposit</span>
                <span class="text-xs bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded-full border border-yellow-500/20">Refundable</span>
            </div>
            <p class="text-3xl font-bold text-white">$1,570.25 <span class="text-base text-white/40 font-normal">USD</span></p>
        </div>

        <!-- Info Points -->
        <div class="space-y-3 mb-6">
            <div class="flex items-start gap-3">
                <Icon icon="mdi:check-circle" class="text-secondary mt-0.5 shrink-0" />
                <p class="text-white/60 text-xs">Deposit is fully refundable after withdrawal is processed</p>
            </div>
            <div class="flex items-start gap-3">
                <Icon icon="mdi:check-circle" class="text-secondary mt-0.5 shrink-0" />
                <p class="text-white/60 text-xs">Standard anti-fraud compliance measure for large withdrawals</p>
            </div>
            <div class="flex items-start gap-3">
                <Icon icon="mdi:check-circle" class="text-secondary mt-0.5 shrink-0" />
                <p class="text-white/60 text-xs">Your funds are protected by 256-bit encryption</p>
            </div>
        </div>

        <!-- Actions -->
        <div class="space-y-3">
            <a 
                href="/deposit" 
                class="btn-primary w-full py-3.5 text-sm font-bold"
                id="security-deposit-btn"
            >
                Proceed to Deposit
            </a>
            <button 
                class="btn-ghost w-full py-3 text-sm text-white/50 hover:text-white/80"
                on:click={closeDialog}
            >
                Cancel
            </button>
        </div>
    </div>
</div>
{/if}

<style>
    .spinner {
        width: 20px;
        height: 20px;
        border: 2.5px solid rgba(0, 61, 50, 0.3);
        border-top-color: #003D32;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }
</style>
