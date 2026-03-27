<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import Icon from '@iconify/svelte';

    // Mock Notifications Data
    const notifications = [
        {
            id: 1,
            title: 'Welcome Back! The launch is finally here.',
            message: 'Thank you for choosing Bitpanda for your investment journey. We’re committed to making investing simple, secure, and rewarding for every user.\n\nExplore the platform, discover new opportunities, and start growing your assets with confidence.',
            date: 'Feb 2, 2026 8:02 am',
            read: false,
            icon: 'mdi:party-popper',
            color: 'text-secondary',
            bg: 'bg-secondary/10'
        }
    ];

    let showContent = false;
    
    onMount(() => {
        showContent = true;

        // Check local storage for read status
        const readNotifications = JSON.parse(localStorage.getItem('readNotifications') || '[]');
        
        notifications.forEach(n => {
            if (readNotifications.includes(n.id)) {
                n.read = true;
            }
        });
        
        // Mark all as read after viewing
        const unreadIds = notifications.filter(n => !n.read).map(n => n.id);
        if (unreadIds.length > 0) {
            const updatedRead = [...readNotifications, ...unreadIds];
            localStorage.setItem('readNotifications', JSON.stringify(updatedRead));
            
            // Re-assign to trigger reactivity if needed, though we just modify properties here for initial render
             notifications.forEach(n => n.read = true);
        }
    });
</script>

<svelte:head>
    <title>Notifications | Bitpanda</title>
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
                <h1 class="text-3xl font-bold text-white mb-1">Notifications</h1>
                <p class="text-white/60">Stay updated with latest news</p>
            </div>
        </header>

        <!-- Notifications List -->
        <div class="space-y-4">
            {#each notifications as notification, i}
                <div class="glass-card p-6 relative group overflow-hidden" in:fly={{ y: 20, delay: i * 100, duration: 500 }}>
                    {#if !notification.read}
                        <div class="absolute top-6 right-6 w-3 h-3 bg-secondary rounded-full"></div>
                    {/if}
                    
                    <div class="flex items-start gap-4">
                        <div class={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${notification.bg} ${notification.color}`}>
                            <Icon icon={notification.icon} class="text-2xl" />
                        </div>
                        <div class="flex-1">
                            <div class="flex items-start justify-between mb-2 pr-6">
                                <h3 class="text-lg font-bold text-white leading-tight">{notification.title}</h3>
                            </div>
                            <p class="text-white/70 text-sm leading-relaxed whitespace-pre-line mb-3">{notification.message}</p>
                            <p class="text-white/40 text-xs">{notification.date}</p>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
        
        {#if notifications.length === 0}
            <div class="text-center py-20 text-white/40">
                <Icon icon="mdi:bell-off-outline" class="text-4xl mx-auto mb-4 opacity-50" />
                <p>No new notifications</p>
            </div>
        {/if}

    </div>
</div>
{/if}
