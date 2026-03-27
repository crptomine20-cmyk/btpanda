<script lang="ts">
	import '../app.css';
    import { page } from '$app/stores';
    import Icon from '@iconify/svelte';

	let { children } = $props();

    const navItems = [
        { href: '/dashboard', label: 'Home', icon: 'mdi:home-variant-outline', activeIcon: 'mdi:home-variant' },
        { href: '/transactions', label: 'Activity', icon: 'mdi:clock-time-four-outline', activeIcon: 'mdi:clock-time-four' },
        { href: '/deposit', label: 'Deposit', icon: 'mdi:wallet-plus-outline', activeIcon: 'mdi:wallet-plus' },
        { href: '/withdrawal', label: 'Withdraw', icon: 'mdi:bank-transfer-out', activeIcon: 'mdi:bank-transfer-out' }, // Reuse icon for simplicity or find variant
        { href: '/profile', label: 'Profile', icon: 'mdi:account-circle-outline', activeIcon: 'mdi:account-circle' },
    ];
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

<style>
    .pb-safe {
        padding-bottom: max(1rem, env(safe-area-inset-bottom, 0px));
    }
</style>
