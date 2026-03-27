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
    <title>Support | Bitpanda</title>
</svelte:head>

{#if showContent}
<div class="min-h-screen bg-surface-dark pb-24 pt-8" in:fade={{ duration: 300 }}>
    <div class="container mx-auto space-y-6 px-4">
        
        <!-- Header -->
        <header class="flex items-center gap-4 mb-8">
            <a href="/profile" class="btn-ghost p-2 rounded-full hover:bg-white/10 transition-colors">
                <Icon icon="mdi:arrow-left" class="text-2xl text-white" />
            </a>
            <div>
                <h1 class="text-3xl font-bold text-white mb-1">Support</h1>
                <p class="text-white/60">How can we help you?</p>
            </div>
        </header>

        <!-- Support Options -->
        <div class="grid gap-6">
            
            <!-- Email Support -->
            <div class="glass-card flex items-start gap-4 p-6" in:fly={{ y: 20, delay: 100, duration: 500 }}>
                <div class="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                    <Icon icon="mdi:email-outline" class="text-2xl" />
                </div>
                <div>
                    <h3 class="text-lg font-bold text-white mb-1">Email Us</h3>
                    <p class="text-white/60 text-sm mb-4">Send us an email and we'll get back to you.</p>
                    <a href="mailto:bitpandacommunity@yahoo.com" class="text-secondary font-medium hover:text-white transition-colors">bitpandacommunity@yahoo.com</a>
                </div>
            </div>

            <!-- Phone Support -->
            <div class="glass-card flex items-start gap-4 p-6" in:fly={{ y: 20, delay: 150, duration: 500 }}>
                <div class="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                    <Icon icon="mdi:phone-outline" class="text-2xl" />
                </div>
                <div>
                    <h3 class="text-lg font-bold text-white mb-1">Phone</h3>
                    <p class="text-white/60 text-sm mb-4">Call our support line.</p>
                    <a href="tel:+12149977573" class="text-blue-400 font-medium hover:text-white transition-colors">+1 214 997 7573</a>
                </div>
            </div>

            <!-- Legal Documents -->
            <div class="space-y-4" in:fly={{ y: 20, delay: 200, duration: 500 }}>
                <h3 class="text-lg font-semibold text-white px-2">Legal Documents</h3>
                
                <a href="/privacy-policy.pdf" target="_blank" class="glass-card flex items-center justify-between p-6 hover:bg-white/5 transition-colors cursor-pointer group">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 shrink-0 group-hover:text-white group-hover:bg-white/10 transition-colors">
                            <Icon icon="mdi:file-document-outline" class="text-xl" />
                        </div>
                        <div>
                            <h3 class="text-white font-bold group-hover:text-secondary transition-colors">Privacy Policy</h3>
                            <p class="text-white/50 text-sm">Read our privacy policy (PDF)</p>
                        </div>
                    </div>
                    <Icon icon="mdi:open-in-new" class="text-white/30 group-hover:text-white transition-colors" />
                </a>

                <a href="/user-agreement.pdf" target="_blank" class="glass-card flex items-center justify-between p-6 hover:bg-white/5 transition-colors cursor-pointer group">
                    <div class="flex items-center gap-4">
                         <div class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 shrink-0 group-hover:text-white group-hover:bg-white/10 transition-colors">
                            <Icon icon="mdi:scale-balance" class="text-xl" />
                        </div>
                        <div>
                            <h3 class="text-white font-bold group-hover:text-secondary transition-colors">Terms & Policies</h3>
                            <p class="text-white/50 text-sm">Read our user agreement (PDF)</p>
                        </div>
                    </div>
                    <Icon icon="mdi:open-in-new" class="text-white/30 group-hover:text-white transition-colors" />
                </a>
            </div>

        </div>

    </div>
</div>
{/if}
