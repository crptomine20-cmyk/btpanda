<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import Icon from '@iconify/svelte';

	const supportEmail = 'bitpandacommunity@yahoo.com';
	const supportPhone = '+12149977573';
</script>

<Seo title="Contact us - Bitpanda" description="Get in touch with Bitpanda support by email or phone." />

<section class="section-padding relative pt-32">
	<div class="container relative z-10">
		<a href="/" class="inline-flex items-center gap-2 text-gray-400 hover:text-secondary text-sm mb-12 transition-colors">
			<Icon icon="lucide:arrow-left" class="w-4 h-4" />
			Back to home
		</a>
		<div class="max-w-2xl mx-auto text-center mb-16">
			<span class="text-secondary font-bold tracking-wider uppercase text-sm mb-3 block">Contact</span>
			<h1 class="text-4xl md:text-5xl font-bold mb-4">Get in touch</h1>
			<p class="text-gray-400 text-lg">Have a question or need help? Reach out to our support team.</p>
		</div>

		<div class="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
			<a
				href="mailto:{supportEmail}"
				class="glass-card flex items-center gap-6 group"
			>
				<div class="w-14 h-14 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 group-hover:border-secondary/40 transition-colors">
					<Icon icon="lucide:mail" class="w-7 h-7 text-secondary" />
				</div>
				<div class="text-left">
					<h2 class="text-lg font-bold mb-1">Email support</h2>
					<p class="text-secondary font-mono text-sm break-all">{supportEmail}</p>
				</div>
			</a>

			<a
				href="tel:+12149977573"
				class="glass-card flex items-center gap-6 group"
			>
				<div class="w-14 h-14 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 group-hover:border-secondary/40 transition-colors">
					<Icon icon="lucide:phone" class="w-7 h-7 text-secondary" />
				</div>
				<div class="text-left">
					<h2 class="text-lg font-bold mb-1">Phone</h2>
					<p class="text-secondary font-mono text-sm">{supportPhone}</p>
				</div>
			</a>
		</div>

		<p class="text-center text-gray-500 text-sm mt-12">
			We aim to respond to all enquiries as quickly as possible.
		</p>
	</div>
</section>
