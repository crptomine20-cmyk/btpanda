<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import Icon from '@iconify/svelte';

    let showContent = false;

    onMount(() => {
        showContent = true;
    });
</script>

<svelte:head>
    <title>Withdrawal | Bitpanda</title>
</svelte:head>

{#if showContent}
<div class="min-h-screen bg-surface-dark pb-24 pt-8 flex items-center justify-center p-4" in:fade={{ duration: 300 }}>
    <div class="container max-w-lg mx-auto">
        
        <div class="glass-card text-center relative overflow-hidden" in:fly={{ y: 20, delay: 100, duration: 500 }}>
            
            <!-- Warning Icon with Glow -->
            <div class="relative mx-auto w-24 h-24 mb-8 flex items-center justify-center">
                <div class="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full"></div>
                <div class="relative w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center border border-yellow-500/20">
                    <Icon icon="mdi:alert-circle-outline" class="text-5xl text-yellow-500" />
                </div>
            </div>

            <h1 class="text-2xl font-bold text-white mb-4">Withdrawal Temporarily Unavailable</h1>
            
            <div class="space-y-4 text-white/70 leading-relaxed text-sm">
                <p>
                    Withdrawals are currently unavailable due to scheduled maintenance and system improvements. We are working to resolve this as quickly as possible, and the service is expected to be restored within the coming weeks.
                </p>
                <p>
                    The exact date will be announced once progress is confirmed.
                </p>
                <p class="pt-4 border-t border-white/5">
                    We sincerely apologize for any inconvenience this may cause and appreciate your patience as we improve the platform to serve you better.
                </p>
            </div>

            <div class="mt-8">
                <a href="/dashboard" class="btn-primary w-full py-3 text-sm">Return to Dashboard</a>
            </div>

        </div>

    </div>
</div>
{/if}
