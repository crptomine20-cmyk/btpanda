<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly, scale } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import Icon from '@iconify/svelte';

    const walletBalance = "237,655.00";
    const profitBalance = "182,000.00";
    const profitBalanceNum = 182000.00;

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
    let showModal = false;
    let modalStep: 'bank_details' | 'verification' = 'bank_details';
    let isSubmittingBank = false;
    let withdrawAmount = '';
    let amountError = '';
    let inputTouched = false;

    // Bank Details State
    let bankName = '';
    let institutionNumber = '';
    let transitNumber = '';
    let accountNumber = '';
    let accountType: 'Chequing' | 'Savings' = 'Chequing';
    let hasSavedBank = false;
    let bankErrors = {
        bankName: '',
        institutionNumber: '',
        transitNumber: '',
        accountNumber: ''
    };

    $: formattedWithdrawAmount = (() => {
        const val = withdrawAmount ? parseAmount(withdrawAmount) : NaN;
        if (!isNaN(val) && val > 0) {
            return '$' + val.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
        }
        return '$43,000';
    })();

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

    function validateBankDetails(): boolean {
        let isValid = true;
        bankErrors = {
            bankName: '',
            institutionNumber: '',
            transitNumber: '',
            accountNumber: ''
        };

        if (!bankName.trim()) {
            bankErrors.bankName = 'Please enter your bank name';
            isValid = false;
        }

        const cleanInst = institutionNumber.trim();
        if (!cleanInst) {
            bankErrors.institutionNumber = 'Enter 3-digit institution number';
            isValid = false;
        } else if (!/^\d{3}$/.test(cleanInst)) {
            bankErrors.institutionNumber = 'Must be 3 digits (e.g. 003)';
            isValid = false;
        }

        const cleanTransit = transitNumber.trim();
        if (!cleanTransit) {
            bankErrors.transitNumber = 'Enter 5-digit transit number';
            isValid = false;
        } else if (!/^\d{5}$/.test(cleanTransit)) {
            bankErrors.transitNumber = 'Must be 5 digits (e.g. 12345)';
            isValid = false;
        }

        const cleanAcct = accountNumber.trim();
        if (!cleanAcct) {
            bankErrors.accountNumber = 'Enter your account number';
            isValid = false;
        } else if (!/^\d{5,14}$/.test(cleanAcct)) {
            bankErrors.accountNumber = 'Must be 5 to 14 digits';
            isValid = false;
        }

        return isValid;
    }

    function saveBankDetails(): boolean {
        try {
            const data = {
                bankName: bankName.trim(),
                institutionNumber: institutionNumber.trim(),
                transitNumber: transitNumber.trim(),
                accountNumber: accountNumber.trim(),
                accountType
            };
            localStorage.setItem('btpanda_bank_details', JSON.stringify(data));
            hasSavedBank = true;
            return true;
        } catch (e) {
            console.error('Failed to save bank details to localStorage:', e);
            return false;
        }
    }

    let isEditingOnly = false;

    function handleWithdraw() {
        if (!validateAmount()) return;

        if (hasSavedBank) {
            // If there is a bank already, don't show the form again, proceed directly
            isWithdrawing = true;
            setTimeout(() => {
                isWithdrawing = false;
                modalStep = 'verification';
                showModal = true;

                const num = parseAmount(withdrawAmount);
                transactionsStore.addTransaction({
                    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    amount: !isNaN(num) ? num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '43,000.00',
                    currency: 'CAD',
                    type: 'Withdrawal',
                    status: 'Processing',
                    details: {
                        address: `${bankName.trim()} (••••${accountNumber.trim().slice(-4)})`,
                        note: `Direct Deposit to ${accountType} account`
                    }
                });
            }, 1200);
        } else {
            // No bank details yet: open the form to collect them
            isEditingOnly = false;
            modalStep = 'bank_details';
            showModal = true;
        }
    }

    function openEditBank() {
        isEditingOnly = true;
        modalStep = 'bank_details';
        showModal = true;
    }

    function handleConfirmBankAndWithdraw() {
        if (!validateBankDetails()) return;

        saveBankDetails();

        if (isEditingOnly) {
            // User specifically tried to edit it: just save and close
            showModal = false;
            isEditingOnly = false;
            return;
        }

        isSubmittingBank = true;
        setTimeout(() => {
            isSubmittingBank = false;
            modalStep = 'verification';

            const num = parseAmount(withdrawAmount);
            transactionsStore.addTransaction({
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                amount: !isNaN(num) ? num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '43,000.00',
                currency: 'CAD',
                type: 'Withdrawal',
                status: 'Processing',
                details: {
                    address: `${bankName.trim()} (••••${accountNumber.trim().slice(-4)})`,
                    note: `Direct Deposit to ${accountType} account`
                }
            });
        }, 1200);
    }

    function closeDialog() {
        showModal = false;
        isEditingOnly = false;
        modalStep = 'bank_details';
    }

    onMount(() => {
        showContent = true;
        try {
            const saved = localStorage.getItem('btpanda_bank_details');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.bankName) bankName = parsed.bankName;
                if (parsed.institutionNumber) institutionNumber = parsed.institutionNumber;
                if (parsed.transitNumber) transitNumber = parsed.transitNumber;
                if (parsed.accountNumber) accountNumber = parsed.accountNumber;
                if (parsed.accountType) accountType = parsed.accountType;
                hasSavedBank = Boolean(bankName && accountNumber);
            }
        } catch (e) {
            console.error('Failed to load bank details from localStorage:', e);
        }
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

        <!-- Saved Bank Details Preview or Setup -->
        {#if hasSavedBank}
            <div class="glass-card flex items-center justify-between" in:fly={{ y: 20, delay: 320, duration: 500 }}>
                <div class="flex items-center gap-3.5">
                    <div class="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20 shrink-0">
                        <Icon icon="mdi:bank" class="text-xl" />
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="text-white font-semibold text-sm">{bankName}</span>
                        </div>
                        <p class="text-xs text-white/50 font-mono mt-0.5">
                            Transit: {transitNumber} · Inst: {institutionNumber} · Acct: ••••{accountNumber.slice(-4)} ({accountType})
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    class="text-xs text-secondary hover:underline font-medium px-3 py-1.5 rounded-lg hover:bg-secondary/10 transition-colors"
                    on:click={openEditBank}
                >
                    Edit
                </button>
            </div>
        {:else}
            <div class="glass-card py-3 px-4 flex items-center justify-between border border-white/5" in:fly={{ y: 20, delay: 320, duration: 500 }}>
                <div class="flex items-center gap-3 text-white/60 text-xs">
                    <Icon icon="mdi:bank-outline" class="text-lg text-secondary shrink-0" />
                    <span>Direct Deposit: Bank details will be requested upon withdrawal</span>
                </div>
                <button
                    type="button"
                    class="text-xs text-secondary hover:underline font-medium shrink-0 ml-2"
                    on:click={openEditBank}
                >
                    Add Bank Info
                </button>
            </div>
        {/if}

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
                            <p class="text-xs {withdrawal.status === 'Completed' ? 'text-green-400' : 'text-yellow-400'} flex items-center gap-1 justify-end">
                                <span class="w-1.5 h-1.5 {withdrawal.status === 'Completed' ? 'bg-green-400' : 'bg-yellow-400'} rounded-full animate-pulse"></span>
                                {withdrawal.status === 'Completed' ? 'Processed' : 'Processing'}
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

<!-- Bank Details & Verification Modal Overlay -->
{#if showModal}
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div 
    class="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto"
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
        class="relative z-10 w-full max-w-lg glass rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl shadow-black/60 my-8"
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

        {#if modalStep === 'bank_details'}
            <!-- Bank Details Form -->
            <div class="relative mx-auto w-16 h-16 mb-4 flex items-center justify-center">
                <div class="absolute inset-0 bg-secondary/20 blur-xl rounded-full"></div>
                <div class="relative w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center border border-secondary/30">
                    <Icon icon="mdi:bank-transfer" class="text-3xl text-secondary" />
                </div>
            </div>

            <h2 class="text-2xl font-bold text-white text-center mb-1">
                {isEditingOnly ? 'Edit Bank Details' : 'Recipient Bank Details'}
            </h2>
            <p class="text-white/60 text-xs text-center mb-6">
                {#if isEditingOnly}
                    Update your Canadian banking information for direct deposit withdrawals.
                {:else}
                    Enter your Canadian banking information to receive your withdrawal of <span class="text-white font-semibold">{formattedWithdrawAmount}</span>.
                {/if}
            </p>

            <form on:submit|preventDefault={handleConfirmBankAndWithdraw} class="space-y-4">
                <!-- Bank Name -->
                <div>
                    <label for="bank-name" class="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                        Bank Name
                    </label>
                    <input
                        id="bank-name"
                        type="text"
                        placeholder="e.g. Royal Bank of Canada, TD Bank, Scotiabank"
                        bind:value={bankName}
                        class="w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all {bankErrors.bankName ? 'border-red-500/50' : 'border-white/10'}"
                    />
                    {#if bankErrors.bankName}
                        <p class="text-xs text-red-400 mt-1 flex items-center gap-1">
                            <Icon icon="mdi:alert-circle-outline" class="text-xs" />
                            {bankErrors.bankName}
                        </p>
                    {/if}
                </div>

                <!-- Institution Number & Transit Number -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label for="institution-number" class="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                            Institution # <span class="text-white/40 font-normal lowercase">(3 digits)</span>
                        </label>
                        <input
                            id="institution-number"
                            type="text"
                            maxlength="3"
                            inputmode="numeric"
                            placeholder="e.g. 003"
                            bind:value={institutionNumber}
                            class="w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white font-mono placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all {bankErrors.institutionNumber ? 'border-red-500/50' : 'border-white/10'}"
                        />
                        {#if bankErrors.institutionNumber}
                            <p class="text-xs text-red-400 mt-1 flex items-center gap-1">
                                <Icon icon="mdi:alert-circle-outline" class="text-xs" />
                                {bankErrors.institutionNumber}
                            </p>
                        {/if}
                    </div>

                    <div>
                        <label for="transit-number" class="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                            Transit # <span class="text-white/40 font-normal lowercase">(5 digits)</span>
                        </label>
                        <input
                            id="transit-number"
                            type="text"
                            maxlength="5"
                            inputmode="numeric"
                            placeholder="e.g. 12345"
                            bind:value={transitNumber}
                            class="w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white font-mono placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all {bankErrors.transitNumber ? 'border-red-500/50' : 'border-white/10'}"
                        />
                        {#if bankErrors.transitNumber}
                            <p class="text-xs text-red-400 mt-1 flex items-center gap-1">
                                <Icon icon="mdi:alert-circle-outline" class="text-xs" />
                                {bankErrors.transitNumber}
                            </p>
                        {/if}
                    </div>
                </div>

                <!-- Account Number & Account Type -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label for="account-number" class="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                            Account Number
                        </label>
                        <input
                            id="account-number"
                            type="text"
                            maxlength="14"
                            inputmode="numeric"
                            placeholder="e.g. 1234567"
                            bind:value={accountNumber}
                            class="w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white font-mono placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all {bankErrors.accountNumber ? 'border-red-500/50' : 'border-white/10'}"
                        />
                        {#if bankErrors.accountNumber}
                            <p class="text-xs text-red-400 mt-1 flex items-center gap-1">
                                <Icon icon="mdi:alert-circle-outline" class="text-xs" />
                                {bankErrors.accountNumber}
                            </p>
                        {/if}
                    </div>

                    <div>
                        <label for="account-type" class="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                            Account Type
                        </label>
                        <select
                            id="account-type"
                            bind:value={accountType}
                            class="w-full bg-[#121c19] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all cursor-pointer"
                        >
                            <option value="Chequing">Chequing Account</option>
                            <option value="Savings">Savings Account</option>
                        </select>
                    </div>
                </div>

                <!-- Canadian Cheque Helper Note -->
                <div class="bg-white/5 rounded-xl p-3 border border-white/5 flex items-start gap-2.5 text-xs text-white/60">
                    <Icon icon="mdi:information-outline" class="text-secondary text-base shrink-0 mt-0.5" />
                    <span>
                        Standard Canadian Direct Deposit format. These numbers can be found at the bottom of your cheque or direct deposit form.
                    </span>
                </div>

                <!-- Storage Info -->
                <div class="flex items-center gap-2 text-xs text-secondary/80">
                    <Icon icon="mdi:shield-check-outline" class="text-sm shrink-0" />
                    <span>Bank details will be saved securely in localStorage for future transfers.</span>
                </div>

                <!-- Submit Button -->
                <div class="pt-2 space-y-2">
                    <button
                        type="submit"
                        class="btn-primary w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                        disabled={isSubmittingBank}
                    >
                        {#if isSubmittingBank}
                            <div class="spinner"></div>
                            <span>Saving & Processing...</span>
                        {:else if isEditingOnly}
                            <Icon icon="mdi:check" class="text-lg" />
                            <span>Save Bank Details</span>
                        {:else}
                            <span>Confirm & Transfer {formattedWithdrawAmount}</span>
                            <Icon icon="mdi:arrow-right" class="text-lg" />
                        {/if}
                    </button>
                    <button
                        type="button"
                        class="btn-ghost w-full py-2.5 text-xs text-white/50 hover:text-white"
                        on:click={closeDialog}
                    >
                        Cancel
                    </button>
                </div>
            </form>

        {:else if modalStep === 'verification'}
            <!-- Withdrawal Processed Step -->
            <div class="relative mx-auto w-20 h-20 mb-6 flex items-center justify-center">
                <div class="absolute inset-0 bg-secondary/20 blur-2xl rounded-full animate-pulse"></div>
                <div class="relative w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center border border-secondary/30">
                    <Icon icon="mdi:check-circle-outline" class="text-4xl text-secondary" />
                </div>
            </div>

            <h2 class="text-2xl font-bold text-white text-center mb-4">
                Withdrawal Processed
            </h2>

            <div class="space-y-4 text-white/70 text-sm leading-relaxed mb-6 text-left bg-white/5 p-5 rounded-2xl border border-white/10">
                <p class="text-white font-bold text-base leading-snug">
                    Your {formattedWithdrawAmount} withdrawal has been processed successfully.
                </p>

                <div class="bg-white/5 px-3 py-2 rounded-xl border border-white/10 text-xs text-white/60 font-mono flex items-center justify-between">
                    <span>{bankName}</span>
                    <span>••••{accountNumber.slice(-4)} ({accountType})</span>
                </div>

                <p>
                    You will receive a further update confirming when the funds are expected to arrive in your provided bank account. Thank you for your patience.
                </p>
            </div>

            <!-- Action Button -->
            <button 
                class="btn-primary w-full py-3.5 text-sm font-bold"
                on:click={closeDialog}
            >
                Understood
            </button>
        {/if}
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
