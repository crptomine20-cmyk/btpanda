<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
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
    onMount(() => {
        showContent = true;
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
