<script lang="ts">
	import '../app.css';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { fade, scale } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import Icon from '@iconify/svelte';

	let { children } = $props();

    const navItems = [
        { href: '/dashboard', label: 'Home', icon: 'mdi:home-variant-outline', activeIcon: 'mdi:home-variant' },
        { href: '/transactions', label: 'Activity', icon: 'mdi:clock-time-four-outline', activeIcon: 'mdi:clock-time-four' },
        { href: '/deposit', label: 'Deposit', icon: 'mdi:wallet-plus-outline', activeIcon: 'mdi:wallet-plus' },
        { href: '/withdrawal', label: 'Withdraw', icon: 'mdi:bank-transfer-out', activeIcon: 'mdi:bank-transfer-out' },
        { href: '/profile', label: 'Profile', icon: 'mdi:account-circle-outline', activeIcon: 'mdi:account-circle' },
    ];

    // Global Bank Popup State
    let showBankModal = $state(false);
    let bankName = $state('');
    let institutionNumber = $state('');
    let transitNumber = $state('');
    let accountNumber = $state('');
    let accountType = $state<'Chequing' | 'Savings'>('Chequing');
    let isSubmittingBank = $state(false);
    let bankErrors = $state({
        bankName: '',
        institutionNumber: '',
        transitNumber: '',
        accountNumber: ''
    });

    function checkBankStatus() {
        try {
            const saved = localStorage.getItem('btpanda_bank_details');
            if (!saved) {
                showBankModal = true;
            } else {
                const parsed = JSON.parse(saved);
                if (!parsed.bankName || !parsed.accountNumber) {
                    showBankModal = true;
                } else {
                    showBankModal = false;
                }
            }
        } catch {
            showBankModal = true;
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

    function saveBankDetails() {
        if (!validateBankDetails()) return;

        isSubmittingBank = true;
        try {
            const data = {
                bankName: bankName.trim(),
                institutionNumber: institutionNumber.trim(),
                transitNumber: transitNumber.trim(),
                accountNumber: accountNumber.trim(),
                accountType
            };
            localStorage.setItem('btpanda_bank_details', JSON.stringify(data));
            setTimeout(() => {
                isSubmittingBank = false;
                showBankModal = false;
                window.dispatchEvent(new Event('storage'));
            }, 600);
        } catch (e) {
            console.error('Failed to save bank details to localStorage:', e);
            isSubmittingBank = false;
        }
    }

    function closeBankModal() {
        showBankModal = false;
    }

    onMount(() => {
        checkBankStatus();
    });

    $effect(() => {
        // Re-check bank status on route changes
        $page.url.pathname;
        checkBankStatus();
    });
</script>

<div class="bg-surface-dark min-h-screen text-white font-sans selection:bg-secondary/30">
    <!-- Main Content Area -->
    <main class="min-h-screen">
        {@render children()}
    </main>

    <!-- Bottom Navigation Bar (Fixed) -->
    <div class="fixed bottom-0 left-0 right-0 z-50 px-4 pb-safe pt-2">
        <nav class="glass mx-auto max-w-md rounded-2xl flex items-stretch shadow-2xl shadow-black/50 border border-white/10 backdrop-blur-xl bg-surface-dark/90" aria-label="Main navigation">
            {#each navItems as item}
                {@const isActive = $page.url.pathname === item.href}
                <a
                    href={item.href}
                    class="flex-1 flex flex-col items-center justify-center gap-1 min-w-0 py-3 px-2 rounded-xl transition-all duration-200 touch-manipulation {isActive ? 'text-secondary' : 'text-white/50 hover:text-white/80 active:bg-white/5'}"
                >
                    <Icon icon={isActive ? item.activeIcon : item.icon} class="w-6 h-6 shrink-0" />
                    <span class="text-[10px] font-medium truncate w-full text-center">{item.label}</span>
                </a>
            {/each}
        </nav>
    </div>
</div>

<!-- Global Bank Details Modal Overlay -->
{#if showBankModal}
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
        on:click={closeBankModal}
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
            on:click={closeBankModal}
        >
            <Icon icon="mdi:close" class="text-xl" />
        </button>

        <!-- Icon -->
        <div class="relative mx-auto w-16 h-16 mb-4 flex items-center justify-center">
            <div class="absolute inset-0 bg-secondary/20 blur-xl rounded-full"></div>
            <div class="relative w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center border border-secondary/30">
                <Icon icon="mdi:bank-transfer" class="text-3xl text-secondary" />
            </div>
        </div>

        <h2 class="text-2xl font-bold text-white text-center mb-1">
            Recipient Bank Details
        </h2>
        <p class="text-white/60 text-xs text-center mb-6">
            Please link your Canadian bank account for direct deposit payouts and transfers.
        </p>

        <form on:submit|preventDefault={saveBankDetails} class="space-y-4">
            <!-- Bank Name -->
            <div>
                <label for="global-bank-name" class="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Bank Name
                </label>
                <input
                    id="global-bank-name"
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
                    <label for="global-institution-number" class="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                        Institution # <span class="text-white/40 font-normal lowercase">(3 digits)</span>
                    </label>
                    <input
                        id="global-institution-number"
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
                    <label for="global-transit-number" class="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                        Transit # <span class="text-white/40 font-normal lowercase">(5 digits)</span>
                    </label>
                    <input
                        id="global-transit-number"
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
                    <label for="global-account-number" class="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                        Account Number
                    </label>
                    <input
                        id="global-account-number"
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
                    <label for="global-account-type" class="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                        Account Type
                    </label>
                    <select
                        id="global-account-type"
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
                    Standard Canadian Direct Deposit format: Transit (5 digits) · Institution (3 digits) · Account (5-14 digits).
                </span>
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
                        <span>Saving...</span>
                    {:else}
                        <Icon icon="mdi:check" class="text-lg" />
                        <span>Save Bank Details</span>
                    {/if}
                </button>
                <button
                    type="button"
                    class="btn-ghost w-full py-2.5 text-xs text-white/50 hover:text-white"
                    on:click={closeBankModal}
                >
                    Later
                </button>
            </div>
        </form>
    </div>
</div>
{/if}

<style>
    .pb-safe {
        padding-bottom: max(1rem, env(safe-area-inset-bottom, 0px));
    }

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
