<script lang="ts">
    import Icon from '@iconify/svelte';
    import Seo from '$lib/components/Seo.svelte';

    let email = $state('');
    let loading = $state(false);
    let submitted = $state(false);

    async function handleSubmit(e: Event) {
        e.preventDefault();
        loading = true;

        // Simulate sending the email (we don't actually send one)
        await new Promise((resolve) => setTimeout(resolve, 1500));

        loading = false;
        submitted = true;
    }

    function tryAgain() {
        submitted = false;
        email = '';
    }
</script>

<Seo
    title="Forgot password - Bitpanda"
    description="Reset your Bitpanda account password. We'll send you a link to create a new password."
/>

<div class="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="w-full max-w-md glass-card p-8 border border-white/10 relative z-10 animate-fade-in-up">
        {#if submitted}
            <!-- Success state -->
            <div class="text-center">
                <div class="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                    <Icon icon="lucide:mail-check" class="w-7 h-7 text-secondary" />
                </div>
                <h1 class="text-2xl font-bold text-white mb-2">Check your email</h1>
                <p class="text-gray-400 text-sm leading-relaxed mb-6">
                    If an account exists with <strong class="text-white">{email}</strong>, you will receive a password reset link shortly. Please check your inbox and spam folder.
                </p>
                <p class="text-gray-500 text-xs mb-8">
                    Didn't receive anything? The email may take a few minutes, or the address may not be registered.
                </p>
                <div class="space-y-3">
                    <a
                        href="/login"
                        class="btn-primary w-full py-3 font-bold text-sm shadow-lg shadow-secondary/20 flex items-center justify-center"
                    >
                        Back to login
                    </a>
                    <button
                        type="button"
                        onclick={tryAgain}
                        class="w-full py-3 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        Use a different email
                    </button>
                </div>
            </div>
        {:else}
            <!-- Form state -->
            <div class="text-center mb-8">
                <img src="/logo-icon-white.png" alt="Bitpanda" class="h-12 w-auto mx-auto mb-4" />
                <h1 class="text-2xl font-bold text-white mb-2">Forgot password?</h1>
                <p class="text-gray-400 text-sm">Enter your email and we'll send you a link to reset your password.</p>
            </div>

            <form onsubmit={handleSubmit} class="space-y-4">
                <div>
                    <label for="email" class="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">Email address</label>
                    <div class="relative">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            bind:value={email}
                            autocomplete="email"
                            class="w-full bg-surface-dark border border-white/10 rounded-lg px-4 py-3 pl-10 text-white focus:outline-none focus:border-secondary transition-colors placeholder-gray-600"
                            placeholder="you@example.com"
                            required
                        />
                        <Icon icon="lucide:mail" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                    </div>
                </div>

                <button
                    type="submit"
                    class="btn-primary w-full py-3 font-bold text-sm shadow-lg shadow-secondary/20 flex items-center justify-center"
                    disabled={loading}
                >
                    {#if loading}
                        <Icon icon="lucide:loader-2" class="w-4 h-4 animate-spin mr-2" />
                        Sending...
                    {:else}
                        Send reset link
                    {/if}
                </button>
            </form>

            <div class="mt-6 text-center">
                <a href="/login" class="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-secondary transition-colors">
                    <Icon icon="lucide:arrow-left" class="w-4 h-4 shrink-0" />
                    Back to login
                </a>
            </div>
        {/if}
    </div>
</div>
