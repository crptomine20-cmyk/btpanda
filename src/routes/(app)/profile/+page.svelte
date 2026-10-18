<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly, scale } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import Icon from '@iconify/svelte';

    const user = {
        name: 'Don Tittle',
        email: 'donlennus@gmail.com',
        phone: '+14383766685',
        location: 'Canada',
        avatar: 'https://ui-avatars.com/api/?name=Don+Tittle&background=03D476&color=003D32&size=128'
    };

    const menuItems = [
        { icon: 'mdi:help-circle-outline', label: 'Support', href: '/support' },
        { icon: 'mdi:shield-account-outline', label: 'Privacy Policy', href: '/privacy-policy.pdf', target: '_blank' },
    ];

    let showContent = false;

    // Bank Details State
    let showBankModal = false;
    let bankName = '';
    let institutionNumber = '';
    let transitNumber = '';
    let accountNumber = '';
    let accountType: 'Chequing' | 'Savings' = 'Chequing';
    let hasSavedBank = false;
    let showFullAccount = false;
    let isSubmittingBank = false;
    let bankErrors = {
        bankName: '',
        institutionNumber: '',
        transitNumber: '',
        accountNumber: ''
    };

    function loadBankDetails() {
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
            } else {
                hasSavedBank = false;
            }
        } catch (e) {
            console.error('Failed to parse bank details:', e);
            hasSavedBank = false;
        }
    }

    function openBankModal() {
        loadBankDetails();
        bankErrors = { bankName: '', institutionNumber: '', transitNumber: '', accountNumber: '' };
        showBankModal = true;
    }

    function closeBankModal() {
        showBankModal = false;
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
            hasSavedBank = true;
            setTimeout(() => {
                isSubmittingBank = false;
                showBankModal = false;
            }, 500);
        } catch (e) {
            console.error('Failed to save bank details to localStorage:', e);
            isSubmittingBank = false;
        }
    }

    onMount(() => {
        showContent = true;
        loadBankDetails();
    });
</script>

<svelte:head>
    <title>Profile | Bitpanda</title>
</svelte:head>

{#if showContent}
<div class="min-h-screen bg-surface-dark pb-24 pt-8" in:fade={{ duration: 300 }}>
    <div class="container mx-auto space-y-6 px-4">
        
        <!-- Header -->
        <header class="flex items-center gap-4 mb-8">
            <a href="/dashboard" class="btn-ghost p-2 rounded-full hover:bg-white/10 transition-colors">
                <Icon icon="mdi:arrow-left" class="text-2xl text-white" />
            </a>
            <div>
                <h1 class="text-3xl font-bold text-white mb-1">My Account</h1>
                <p class="text-white/60">Manage your profile & settings</p>
            </div>
        </header>

        <!-- Profile Card -->
        <div class="glass-card flex flex-col items-center text-center py-8 relative overflow-hidden" in:fly={{ y: 20, delay: 100, duration: 500 }}>
             <!-- Background Blur -->
             <div class="absolute top-0 left-0 w-full h-32 bg-secondary/10 blur-3xl"></div>

            <div class="relative mb-4">
                <img src={user.avatar} alt={user.name} class="w-24 h-24 rounded-full border-4 border-surface-dark shadow-xl" />
                <div class="absolute bottom-0 right-0 p-1.5 bg-green-500 rounded-full border-4 border-surface-dark"></div>
            </div>
            
            <h2 class="text-2xl font-bold text-white">{user.name}</h2>
            <p class="text-white/50 text-sm mt-1">{user.location}</p>
            
            <div class="mt-6 w-full grid grid-cols-2 gap-4 max-w-sm">
                <div class="bg-white/5 p-3 rounded-xl border border-white/5">
                    <p class="text-xs text-white/40 uppercase tracking-wider mb-1">Status</p>
                    <div class="flex items-center justify-center gap-1 text-green-400 font-medium text-sm">
                        <Icon icon="mdi:check-decagram" />
                        Verified
                    </div>
                </div>
                <div class="bg-white/5 p-3 rounded-xl border border-white/5">
                     <p class="text-xs text-white/40 uppercase tracking-wider mb-1">Member Since</p>
                    <p class="text-white font-medium text-sm">August 2024</p>
                </div>
            </div>
        </div>

        <!-- Contact Info -->
        <div class="glass-card space-y-4" in:fly={{ y: 20, delay: 200, duration: 500 }}>
            <h3 class="text-lg font-semibold text-white mb-2">Contact Information</h3>
            
            <div class="space-y-4">
                <div class="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                    <div class="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                        <Icon icon="mdi:email-outline" class="text-xl" />
                    </div>
                    <div class="overflow-hidden">
                        <p class="text-xs text-white/40">Email Address</p>
                        <p class="text-white text-sm truncate">{user.email}</p>
                    </div>
                </div>

                <div class="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                    <div class="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                         <Icon icon="mdi:phone-outline" class="text-xl" />
                    </div>
                    <div>
                        <p class="text-xs text-white/40">Phone Number</p>
                        <p class="text-white text-sm">{user.phone}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Banking Information Card -->
        <div class="glass-card space-y-4" in:fly={{ y: 20, delay: 250, duration: 500 }}>
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                        <Icon icon="mdi:bank" class="text-xl" />
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold text-white">Bank Account Details</h3>
                        <p class="text-white/40 text-xs">Direct deposit & withdrawal account</p>
                    </div>
                </div>
                {#if hasSavedBank}
                    <button
                        type="button"
                        class="text-xs text-secondary hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-secondary/30 hover:border-secondary transition-colors"
                        on:click={openBankModal}
                    >
                        <Icon icon="mdi:pencil-outline" class="text-sm" />
                        <span>Edit</span>
                    </button>
                {/if}
            </div>

            {#if hasSavedBank}
                <div class="bg-white/5 rounded-2xl p-5 border border-white/5 space-y-4">
                    <div class="flex items-start justify-between border-b border-white/5 pb-4">
                        <div>
                            <p class="text-xs text-white/40 uppercase tracking-wider mb-0.5">Bank Name</p>
                            <p class="text-white font-semibold text-base">{bankName}</p>
                            <p class="text-xs text-white/50 mt-0.5">{accountType} Account</p>
                        </div>
                        <span class="text-xs bg-secondary/15 text-secondary px-2.5 py-1 rounded-full border border-secondary/20 flex items-center gap-1">
                            <span class="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                            Active
                        </span>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                        <div class="bg-white/5 p-3 rounded-xl border border-white/5">
                            <p class="text-xs text-white/40 uppercase tracking-wider mb-1">Institution #</p>
                            <p class="text-white font-mono font-medium text-sm">{institutionNumber}</p>
                        </div>

                        <div class="bg-white/5 p-3 rounded-xl border border-white/5">
                            <p class="text-xs text-white/40 uppercase tracking-wider mb-1">Transit #</p>
                            <p class="text-white font-mono font-medium text-sm">{transitNumber}</p>
                        </div>

                        <div class="bg-white/5 p-3 rounded-xl border border-white/5 flex items-center justify-between">
                            <div>
                                <p class="text-xs text-white/40 uppercase tracking-wider mb-1">Account #</p>
                                <p class="text-white font-mono font-medium text-sm">
                                    {showFullAccount ? accountNumber : `••••${accountNumber.slice(-4)}`}
                                </p>
                            </div>
                            <button
                                type="button"
                                class="text-white/40 hover:text-white p-1 transition-colors"
                                on:click={() => showFullAccount = !showFullAccount}
                                title={showFullAccount ? 'Hide account number' : 'Show account number'}
                            >
                                <Icon icon={showFullAccount ? 'mdi:eye-off-outline' : 'mdi:eye-outline'} class="text-lg" />
                            </button>
                        </div>
                    </div>
                </div>
            {:else}
                <div class="bg-white/5 rounded-2xl p-6 border border-white/5 text-center space-y-3">
                    <p class="text-white font-medium text-sm">No Bank Account Linked</p>
                    <p class="text-white/50 text-xs max-w-sm mx-auto">
                        Link your Canadian bank account for direct deposit transfers and withdrawals.
                    </p>
                    <button
                        type="button"
                        class="btn-primary py-2.5 px-5 text-xs font-bold inline-flex items-center gap-2 mt-2"
                        on:click={openBankModal}
                    >
                        <Icon icon="mdi:plus" class="text-sm" />
                        <span>Add Bank Details</span>
                    </button>
                </div>
            {/if}
        </div>

        <!-- Menu items -->
         <div class="space-y-2" in:fly={{ y: 20, delay: 300, duration: 500 }}>
             {#each menuItems as item}
                <a 
                    href={item.href} 
                    target={item.target || '_self'} 
                    class="w-full glass-card p-4 flex items-center justify-between hover:bg-white/10 transition-colors group"
                >
                    <div class="flex items-center gap-4">
                        <Icon icon={item.icon} class="text-xl text-white/60 group-hover:text-white transition-colors" />
                        <span class="text-white font-medium">{item.label}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <Icon icon="mdi:chevron-right" class="text-white/30" />
                    </div>
                </a>
             {/each}
         </div>

        <a
            href="/login"
            class="w-full block py-4 text-center text-red-400 font-medium hover:bg-red-500/10 rounded-xl transition-colors mt-6"
        >
            Log Out
        </a>

    </div>
</div>
{/if}

<!-- Bank Details Modal Overlay -->
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
            {hasSavedBank ? 'Edit Bank Details' : 'Add Bank Account'}
        </h2>
        <p class="text-white/60 text-xs text-center mb-6">
            Enter your Canadian banking information for direct deposit payouts and withdrawals.
        </p>

        <form on:submit|preventDefault={saveBankDetails} class="space-y-4">
            <!-- Bank Name -->
            <div>
                <label for="prof-bank-name" class="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Bank Name
                </label>
                <input
                    id="prof-bank-name"
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
                    <label for="prof-institution-number" class="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                        Institution # <span class="text-white/40 font-normal lowercase">(3 digits)</span>
                    </label>
                    <input
                        id="prof-institution-number"
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
                    <label for="prof-transit-number" class="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                        Transit # <span class="text-white/40 font-normal lowercase">(5 digits)</span>
                    </label>
                    <input
                        id="prof-transit-number"
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
                    <label for="prof-account-number" class="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                        Account Number
                    </label>
                    <input
                        id="prof-account-number"
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
                    <label for="prof-account-type" class="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                        Account Type
                    </label>
                    <select
                        id="prof-account-type"
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
                    Cancel
                </button>
            </div>
        </form>
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
