<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import Icon from '@iconify/svelte';

  let scrolled = false;
  let mobileMenuOpen = false;

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 20;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function toggleMobileMenu() {
      mobileMenuOpen = !mobileMenuOpen;
  }
</script>

<header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {scrolled ? 'py-4' : 'py-6'}">
  <div class="container mx-auto px-4">
    <div class="glass rounded-full px-6 py-3 flex justify-between items-center shadow-lg transition-all duration-300 {scrolled ? 'bg-surface-dark/80' : 'bg-surface-glass'} relative z-50">
        <a href="/" class="flex items-center space-x-2 relative z-50">
            <img src="/logo-white.png" alt="Bitpanda Logo" class="h-8 w-auto transform transition-transform hover:scale-105" />
        </a>
        
        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center space-x-1" aria-label="Main navigation">
            <a href="/#features" class="btn-ghost px-4 py-2 rounded-full font-medium text-sm">Features</a>
            <a href="/#prices" class="btn-ghost px-4 py-2 rounded-full font-medium text-sm">Prices</a>
            <a href="/#how-it-works" class="btn-ghost px-4 py-2 rounded-full font-medium text-sm">How it works</a>
            <a href="/contact" class="btn-ghost px-4 py-2 rounded-full font-medium text-sm">Contact</a>
        </nav>
        
        <div class="flex items-center space-x-3">
            <a href="/login" class="text-white hover:text-secondary font-medium hidden sm:block text-sm px-4">Log in</a>
            <a href="/signup" class="btn-primary text-sm px-6 py-2 hidden sm:block">Sign up</a>
            
            <!-- Mobile Menu Toggle -->
            <button class="md:hidden text-white hover:text-secondary transition-colors relative z-50" aria-label="Toggle menu" on:click={toggleMobileMenu}>
                {#if mobileMenuOpen}
                    <Icon icon="lucide:x" class="w-6 h-6" />
                {:else}
                    <Icon icon="lucide:menu" class="w-6 h-6" />
                {/if}
            </button>
        </div>
    </div>
  </div>

  <!-- Mobile Menu Overlay -->
  {#if mobileMenuOpen}
    <div 
        class="fixed inset-0 bg-surface-dark/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center p-8 md:hidden"
        transition:fade={{ duration: 300 }}
    >
        <button class="absolute top-6 right-6 text-gray-400 hover:text-white" on:click={toggleMobileMenu} aria-label="Close menu">
            <Icon icon="lucide:x" class="w-8 h-8" />
        </button>
        <nav 
            class="flex flex-col items-center space-y-6 text-xl"
            in:fly={{ y: 20, duration: 500, delay: 150 }} 
            out:fly={{ y: 20, duration: 300 }}
        >
             <a href="/#features" class="text-white hover:text-secondary font-bold transition-colors" on:click={toggleMobileMenu}>Features</a>
            <a href="/#prices" class="text-white hover:text-secondary font-bold transition-colors" on:click={toggleMobileMenu}>Prices</a>
            <a href="/#how-it-works" class="text-white hover:text-secondary font-bold transition-colors" on:click={toggleMobileMenu}>How it works</a>
            <a href="/contact" class="text-white hover:text-secondary font-bold transition-colors" on:click={toggleMobileMenu}>Contact</a>
            
            <div class="w-12 h-px bg-white/10 my-4"></div>
            
            <a href="/login" class="text-white hover:text-secondary font-bold transition-colors" on:click={toggleMobileMenu}>Log in</a>
            <a href="/signup" class="btn-primary px-8 py-3 text-lg" on:click={toggleMobileMenu}>Sign up</a>
        </nav>
    </div>
  {/if}
</header>

