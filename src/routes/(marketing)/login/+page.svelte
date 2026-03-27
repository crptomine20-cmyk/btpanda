<script lang="ts">
    import { goto } from '$app/navigation';
    import Icon from '@iconify/svelte';
    import Seo from '$lib/components/Seo.svelte';
    import { dev } from '$app/environment';

    let username = $state('');
    let password = $state('');
    let error = $state('');
    let loading = $state(false);

    async function handleLogin(e: Event) {
        e.preventDefault();
        error = '';
        loading = true;

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const validCredentials =
            (username === 'Dontittle24' && password === 'R8!vN3#s') ||
            (dev && username === 'admin' && password === 'admin');

        if (validCredentials) {
            goto('/dashboard');
        } else {
            error = 'Invalid username or password.';
            loading = false;
        }
    }
</script>

<Seo title="Log in - Bitpanda" description="Sign in to your Bitpanda account to access your dashboard and manage your investments." />

<div class="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="w-full max-w-md glass-card p-8 border border-white/10 relative z-10 animate-fade-in-up">
        <div class="text-center mb-8">
            <img src="/logo-icon-white.png" alt="Bitpanda" class="h-12 w-auto mx-auto mb-4" />
            <h1 class="text-2xl font-bold text-white mb-2">Welcome back</h1>
            <p class="text-gray-400 text-sm">Sign in to access your dashboard</p>
        </div>

        {#if error}
            <div class="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg mb-6 flex items-center">
                <Icon icon="lucide:alert-circle" class="w-4 h-4 mr-2" />
                {error}
            </div>
        {/if}

        <form onsubmit={handleLogin} class="space-y-4">
            <div>
                <label for="username" class="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">Username</label>
                <div class="relative">
                    <input 
                        type="text" 
                        id="username" 
                        name="username"
                        bind:value={username}
                        autocomplete="username"
                        class="w-full bg-surface-dark border border-white/10 rounded-lg px-4 py-3 pl-10 text-white focus:outline-none focus:border-secondary transition-colors placeholder-gray-600"
                        placeholder="Enter your username"
                        required
                    />
                    <Icon icon="lucide:user" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                </div>
            </div>

            <div>
                <div class="flex justify-between items-center mb-1.5">
                    <label for="password" class="block text-xs font-medium text-gray-400 uppercase tracking-wide">Password</label>
                    <a href="/forgot-password" class="text-xs text-secondary hover:text-white transition-colors">Forgot password?</a>
                </div>
                <div class="relative">
                    <input 
                        type="password" 
                        id="password" 
                        bind:value={password}
                        class="w-full bg-surface-dark border border-white/10 rounded-lg px-4 py-3 pl-10 text-white focus:outline-none focus:border-secondary transition-colors placeholder-gray-600"
                        placeholder="••••••••"
                        required
                    />
                    <Icon icon="lucide:lock" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                </div>
            </div>

            <button 
                type="submit" 
                class="btn-primary w-full py-3 font-bold text-sm shadow-lg shadow-secondary/20 flex items-center justify-center"
                disabled={loading}
            >
                {#if loading}
                    <Icon icon="lucide:loader-2" class="w-4 h-4 animate-spin mr-2" />
                    Signing in...
                {:else}
                    Sign In
                {/if}
            </button>
        </form>

        <div class="mt-6 text-center text-sm text-gray-400">
            Don't have an account? <a href="/signup" class="text-secondary hover:text-white transition-colors font-medium">Sign up</a>
        </div>
    </div>
</div>
