<script lang="ts">
    import { goto } from '$app/navigation';
    import Icon from '@iconify/svelte';
    import Seo from '$lib/components/Seo.svelte';

    let name = $state('');
    let email = $state('');
    let password = $state('');
    let loading = $state(false);

    async function handleSignup(e: Event) {
        e.preventDefault();
        loading = true;

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // For demo, just redirect to dashboard
        goto('/dashboard');
    }
</script>

<Seo title="Sign up - Bitpanda" description="Create your free Bitpanda account and start investing in crypto, stocks, and metals." />

<div class="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="w-full max-w-md glass-card p-8 border border-white/10 relative z-10 animate-fade-in-up">
        <div class="text-center mb-8">
            <img src="/logo-icon-white.png" alt="Bitpanda" class="h-12 w-auto mx-auto mb-4" />
            <h1 class="text-2xl font-bold text-white mb-2">Create Account</h1>
            <p class="text-gray-400 text-sm">Join millions of investors today</p>
        </div>

        <form onsubmit={handleSignup} class="space-y-4">
             <div>
                <label for="name" class="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">Full Name</label>
                <div class="relative">
                    <input 
                        type="text" 
                        id="name" 
                        bind:value={name}
                        class="w-full bg-surface-dark border border-white/10 rounded-lg px-4 py-3 pl-10 text-white focus:outline-none focus:border-secondary transition-colors placeholder-gray-600"
                        placeholder="John Doe"
                        required
                    />
                    <Icon icon="lucide:user" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                </div>
            </div>

            <div>
                <label for="email" class="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">Email Address</label>
                <div class="relative">
                    <input 
                        type="email" 
                        id="email" 
                        bind:value={email}
                        class="w-full bg-surface-dark border border-white/10 rounded-lg px-4 py-3 pl-10 text-white focus:outline-none focus:border-secondary transition-colors placeholder-gray-600"
                        placeholder="john@example.com"
                        required
                    />
                    <Icon icon="lucide:mail" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                </div>
            </div>

            <div>
                <label for="password" class="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">Password</label>
                <div class="relative">
                    <input 
                        type="password" 
                        id="password" 
                        bind:value={password}
                        class="w-full bg-surface-dark border border-white/10 rounded-lg px-4 py-3 pl-10 text-white focus:outline-none focus:border-secondary transition-colors placeholder-gray-600"
                        placeholder="Create a strong password"
                        required
                        minlength="8"
                    />
                    <Icon icon="lucide:lock" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                </div>
                <p class="text-[10px] text-gray-500 mt-1">Must be at least 8 characters</p>
            </div>

            <div class="flex items-start space-x-2 pt-2">
                <input type="checkbox" id="terms" required class="mt-1 rounded bg-surface-dark border-white/10 text-secondary focus:ring-secondary" />
                <label for="terms" class="text-xs text-gray-400">
                    I agree to the <a href="/user-agreement.pdf" target="_blank" rel="noopener noreferrer" class="text-secondary hover:text-white">Terms & Policies</a> and <a href="/privacy-policy.pdf" target="_blank" rel="noopener noreferrer" class="text-secondary hover:text-white">Privacy Policy</a>.
                </label>
            </div>

            <button 
                type="submit" 
                class="btn-primary w-full py-3 font-bold text-sm shadow-lg shadow-secondary/20 flex items-center justify-center"
                disabled={loading}
            >
                {#if loading}
                    <Icon icon="lucide:loader-2" class="w-4 h-4 animate-spin mr-2" />
                    Creating account...
                {:else}
                    Create Account
                {/if}
            </button>
        </form>

        <div class="mt-6 text-center text-sm text-gray-400">
            Already have an account? <a href="/login" class="text-secondary hover:text-white transition-colors font-medium">Log in</a>
        </div>
    </div>
</div>
