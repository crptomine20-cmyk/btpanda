<script>
  import Icon from '@iconify/svelte';
</script>

<footer class="bg-surface-dark border-t border-white/10 pt-16 pb-10">
  <div class="container mx-auto px-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-10 mb-12">
      <div class="space-y-4 max-w-md">
        <img src="/logo-white.png" alt="Bitpanda" class="h-8 opacity-90" />
        <p class="text-gray-400 text-sm leading-relaxed">
          Bitpanda is the leading European neobroker on a mission to democratize the complex world of investing.
        </p>
        <div class="flex space-x-3">
          <a href="https://x.com/bitpanda" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors text-sm font-medium" aria-label="Bitpanda on X">
            <Icon icon="simple-icons:x" class="w-4 h-4" />
          </a>
          <a href="https://linkedin.com/company/bitpanda" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors text-sm font-medium" aria-label="Bitpanda on LinkedIn">
            <Icon icon="lucide:linkedin" class="w-4 h-4" />
          </a>
          <a href="https://facebook.com/bitpanda" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors text-sm font-medium" aria-label="Bitpanda on Facebook">
            <Icon icon="lucide:facebook" class="w-4 h-4" />
          </a>
          <a href="https://instagram.com/bitpanda_global" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors text-sm font-medium" aria-label="Bitpanda on Instagram">
            <Icon icon="lucide:instagram" class="w-4 h-4" />
          </a>
        </div>
      </div>
      <div class="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-400">
        <a href="/contact" class="hover:text-secondary transition-colors">Contact</a>
      </div>
    </div>

    <div class="pt-8 border-t border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-gray-500">
      <p>&copy; {new Date().getFullYear()} Bitpanda GmbH. All rights reserved.</p>
      <div class="flex flex-wrap gap-x-6">
        <a href="/privacy-policy.pdf" target="_blank" rel="noopener noreferrer" class="hover:text-gray-400 transition-colors">Privacy Policy</a>
        <a href="/user-agreement.pdf" target="_blank" rel="noopener noreferrer" class="hover:text-gray-400 transition-colors">Terms & Policies</a>
      </div>
    </div>
  </div>
</footer>
