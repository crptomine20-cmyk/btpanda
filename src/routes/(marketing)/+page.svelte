<script lang="ts">
	import Seo from "$lib/components/Seo.svelte";
    import Ticker from "$lib/components/Ticker.svelte";
    import BentoGrid from "$lib/components/BentoGrid.svelte";
    import Icon from '@iconify/svelte';
    import { market } from '$lib/stores/market.svelte';

    const howItWorksSteps = [
        { num: '01', title: 'Register', desc: 'Sign up to create your free Bitpanda account.', icon: 'lucide:user-plus' },
        { num: '02', title: 'Verify', desc: 'Verify your identity with one of our trusted verification partners.', icon: 'lucide:shield-check' },
        { num: '03', title: 'Deposit', desc: 'Deposit your funds securely through popular options.', icon: 'lucide:wallet' },
        { num: '04', title: 'Trade', desc: 'Buy, sell and swap digital assets 24/7.', icon: 'lucide:trending-up' }
    ];
</script>

<Seo title="Bitpanda - Invest in Bitcoin, Gold and more" description="The leading European platform for investing in crypto, stocks, ETFs, and metals." />

<!-- Hero Section -->
<section class="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-32 pb-16">
    <!-- Background Effects -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
    <div class="absolute top-0 right-0 w-full h-full bg-[url('/grid.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

    <div class="container relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <!-- Content -->
        <div class="text-left space-y-8">
            <div class="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm animate-fade-in-up">
                <span class="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span class="text-sm font-medium text-secondary tracking-wide uppercase">Europe's #1 Broker</span>
            </div>
            
            <h1 class="text-6xl md:text-7xl font-extrabold leading-tight tracking-tight animate-fade-in-up delay-100">
                Invest in <br/>
                <span class="text-transparent bg-clip-text bg-linear-to-r from-white to-gray-400">your future.</span>
            </h1>
            
            <p class="text-xl text-gray-400 max-w-lg leading-relaxed animate-fade-in-up delay-200">
                Buy Bitcoin, crypto, stocks, and metals with just €1. Join 4 million users on the most secure platform in Europe.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
                <a href="/signup" class="btn-primary px-8 py-4 text-lg shadow-lg shadow-secondary/20">
                    Get Started
                </a>
                <a href="#prices" class="btn-outline px-8 py-4 text-lg">
                    View Prices
                </a>
            </div>
            
            <div class="pt-8 flex items-center space-x-4 animate-fade-in-up delay-500">
                <div class="flex -space-x-4">
                    <img class="w-10 h-10 rounded-full border-2 border-surface-dark" src="https://ui-avatars.com/api/?name=A&background=random" alt="User" />
                    <img class="w-10 h-10 rounded-full border-2 border-surface-dark" src="https://ui-avatars.com/api/?name=B&background=random" alt="User" />
                    <img class="w-10 h-10 rounded-full border-2 border-surface-dark" src="https://ui-avatars.com/api/?name=C&background=random" alt="User" />
                    <div class="w-10 h-10 rounded-full border-2 border-surface-dark bg-surface-brand flex items-center justify-center text-xs font-bold">+4M</div>
                </div>
                <div class="text-sm">
                    <div class="font-bold text-white">Trustpilot</div>
                    <div class="text-secondary flex items-center">
                        <Icon icon="lucide:star" inline={true} class="text-secondary w-4 h-4" />
                        <Icon icon="lucide:star" inline={true} class="text-secondary w-4 h-4" />
                        <Icon icon="lucide:star" inline={true} class="text-secondary w-4 h-4" />
                        <Icon icon="lucide:star" inline={true} class="text-secondary w-4 h-4" />
                        <Icon icon="lucide:star" inline={true} class="text-secondary w-4 h-4" />
                        <span class="text-gray-500 ml-1">4.8/5</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Visual / 3D Element Placeholder -->
        <div class="relative hidden lg:block animate-float">
            <div class="relative z-10 glass-card p-6 rotate-3 hover:rotate-0 transition-transform duration-500 border border-white/20 max-w-md mx-auto w-full">
                <div class="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                    <div class="flex items-center space-x-2">
                        <div class="relative flex h-3 w-3">
                          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                          <span class="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                        </div>
                        <h3 class="font-bold text-white tracking-wide uppercase text-xs">Live Deposits</h3>
                    </div>
                    <div class="text-xs text-gray-500 font-mono">Real-time feed</div>
                </div>
                
                <div class="space-y-3">
                    <!-- Item 1 -->
                    <div class="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default group">
                        <div class="flex items-center space-x-3">
                             <img src="https://ui-avatars.com/api/?name=Alex+M&background=003D32&color=fff" class="w-10 h-10 rounded-full border border-white/10" alt="Avatar" />
                             <div>
                                 <div class="text-sm font-bold text-white group-hover:text-secondary transition-colors">Alex M.</div>
                                 <div class="text-xs text-gray-400">Via SEPA Instant</div>
                             </div>
                        </div>
                        <div class="text-right">
                             <div class="text-secondary font-bold font-mono text-sm">+ €15,000.00</div>
                             <div class="text-[10px] text-gray-500">Just now</div>
                        </div>
                    </div>
                    
                    <!-- Item 2 -->
                    <div class="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default group">
                        <div class="flex items-center space-x-3">
                             <img src="https://ui-avatars.com/api/?name=Sarah+K&background=03d476&color=003D32" class="w-10 h-10 rounded-full border border-white/10" alt="Avatar" />
                             <div>
                                 <div class="text-sm font-bold text-white group-hover:text-secondary transition-colors">Sarah K.</div>
                                 <div class="text-xs text-gray-400">Via PayPal</div>
                             </div>
                        </div>
                        <div class="text-right">
                             <div class="text-secondary font-bold font-mono text-sm">+ €8,500.00</div>
                             <div class="text-[10px] text-gray-500">12s ago</div>
                        </div>
                    </div>
                    
                    <!-- Item 3 -->
                    <div class="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default group">
                        <div class="flex items-center space-x-3">
                             <img src="https://ui-avatars.com/api/?name=David+R&background=3b82f6&color=fff" class="w-10 h-10 rounded-full border border-white/10" alt="Avatar" />
                             <div>
                                 <div class="text-sm font-bold text-white group-hover:text-secondary transition-colors">David R.</div>
                                 <div class="text-xs text-gray-400">Via Apple Pay</div>
                             </div>
                        </div>
                        <div class="text-right">
                             <div class="text-secondary font-bold font-mono text-sm">+ €14,250.00</div>
                             <div class="text-[10px] text-gray-500">45s ago</div>
                        </div>
                    </div>

                    <!-- Item 4 -->
                    <div class="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default group">
                        <div class="flex items-center space-x-3">
                             <img src="https://ui-avatars.com/api/?name=Elena+B&background=f97316&color=fff" class="w-10 h-10 rounded-full border border-white/10" alt="Avatar" />
                             <div>
                                 <div class="text-sm font-bold text-white group-hover:text-secondary transition-colors">Elena B.</div>
                                 <div class="text-xs text-gray-400">Via Credit Card</div>
                             </div>
                        </div>
                        <div class="text-right">
                             <div class="text-secondary font-bold font-mono text-sm">+ €550.00</div>
                             <div class="text-[10px] text-gray-500">1m ago</div>
                        </div>
                    </div>
                </div>
                
                 <div class="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-xs text-gray-400">
                    <span>Processing volume</span>
                    <span class="text-white font-mono">€2.4M / hr</span>
                </div>
            </div>
            
            <!-- Floating Elements -->
            <div class="absolute -top-5 -right-5 glass p-3 rounded-xl animate-bounce duration-[3000ms] z-20 flex items-center space-x-2 border-l-4 border-secondary">
                <Icon icon="lucide:check-circle" class="text-secondary w-4 h-4" />
                <span class="text-white font-bold text-xs">Instant Settlement</span>
            </div>
            <div class="absolute -bottom-10 -left-10 glass p-4 rounded-xl animate-bounce delay-700 z-20 flex items-center gap-3">
                 <div class="flex -space-x-3">
                    <div class="w-8 h-8 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center text-[10px]">💶</div>
                    <div class="w-8 h-8 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center text-[10px]">₿</div>
                    <div class="w-8 h-8 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center text-[10px]">🦍</div>
                 </div>
                <span class="text-white font-bold text-sm">Diversify now</span>
            </div>
        </div>
    </div>
</section>

<!-- Ticker -->
<Ticker />

<!-- Features Section -->
<section id="features" class="section-padding relative">
    <div class="container">
        <div class="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
            <h2 class="text-4xl md:text-5xl font-bold mb-6">All your investments. <br/>All on Bitpanda.</h2>
        </div>
        
        <BentoGrid />
        
        <p class="text-center text-xs text-gray-500 mt-8 max-w-2xl mx-auto">
            Investing in stocks, ETFs and commodities carries risks. Conduct your own research before concluding a transaction.
        </p>
    </div>
</section>

<!-- Prices Section -->
<section id="prices" class="py-20 relative bg-surface-dark border-y border-white/5">
     <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-50 pointer-events-none"></div>
    <div class="container relative z-10">
        <div class="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
                <h2 class="text-3xl md:text-4xl font-bold mb-4">Keep tabs on your favourite assets</h2>
            </div>
            <a href="/signup" class="btn-ghost flex items-center mt-4 md:mt-0 group">
                Start investing <Icon icon="lucide:arrow-right" class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
        </div>

        <div class="glass-card overflow-hidden p-0">
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead class="bg-white/5 text-gray-400 text-sm uppercase">
                        <tr>
                            <th class="px-6 py-4 font-medium">Name</th>
                            <th class="px-6 py-4 font-medium">Price</th>
                            <th class="px-6 py-4 font-medium">24h Change</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-white/5">
                        {#each [
                            { key: 'XAU', name: 'Gold', symbol: 'XAU', icon: 'lucide:coins' },
                            { key: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', icon: 'cryptocurrency:btc' },
                            { key: 'ethereum', name: 'Ethereum', symbol: 'ETH', icon: 'cryptocurrency:eth' },
                            { key: 'XAG', name: 'Silver', symbol: 'XAG', icon: 'lucide:disc' },
                            { key: 'binancecoin', name: 'BNB', symbol: 'BNB', icon: 'cryptocurrency:bnb' },
                            { key: 'ripple', name: 'XRP', symbol: 'XRP', icon: 'cryptocurrency:xrp' },
                            { key: 'solana', name: 'Solana', symbol: 'SOL', icon: 'cryptocurrency:sol' },
                        ] as asset}
                        {@const data = market.data[asset.key] || { price: 0, change: 0 }}
                        <tr class="hover:bg-white/5 transition-colors group">
                            <td class="px-6 py-4 flex items-center space-x-3">
                                <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400">
                                     <Icon icon={asset.icon} width="16" height="16" />
                                </div>
                                <div>
                                    <div class="font-bold">{asset.name}</div>
                                    <div class="text-xs text-gray-500">{asset.symbol}</div>
                                </div>
                            </td>
                            <td class="px-6 py-4 font-mono">€{data.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</td>
                            <td class="px-6 py-4 font-mono font-bold {data.change >= 0 ? 'text-secondary' : 'text-red-500'}">
                                {data.change >= 0 ? '+' : ''}{data.change.toFixed(2)}%
                            </td>
                        </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
            <p class="text-xs text-center text-gray-500 mt-4 pb-4">Past performance is not an indication of future performance.</p>
        </div>
    </div>
</section>

<!-- Recent Withdrawals Social Proof -->
<section id="withdrawals" class="py-20 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none"></div>
    <div class="container relative z-10">
        <div class="text-center mb-12">
            <div class="inline-flex items-center space-x-2 bg-secondary/10 border border-secondary/20 rounded-full px-4 py-1.5 mb-6">
                <span class="relative flex h-2.5 w-2.5">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
                </span>
                <span class="text-sm font-semibold text-secondary tracking-wide uppercase">Live Payouts</span>
            </div>
            <h2 class="text-4xl md:text-5xl font-bold mb-4">Users are withdrawing <span class="text-transparent bg-clip-text bg-linear-to-r from-secondary to-emerald-400">right now</span></h2>
            <p class="text-gray-400 max-w-2xl mx-auto text-lg">Join thousands of investors who trust Bitpanda for fast, secure withdrawals every day.</p>
        </div>

        <!-- Stats Row -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div class="glass-card text-center py-5">
                <p class="text-2xl md:text-3xl font-bold text-white font-mono">€4.2M</p>
                <p class="text-xs text-gray-400 mt-1 uppercase tracking-wider">Paid out today</p>
            </div>
            <div class="glass-card text-center py-5">
                <p class="text-2xl md:text-3xl font-bold text-secondary font-mono">2,847</p>
                <p class="text-xs text-gray-400 mt-1 uppercase tracking-wider">Withdrawals today</p>
            </div>
            <div class="glass-card text-center py-5">
                <p class="text-2xl md:text-3xl font-bold text-white font-mono">&lt; 2min</p>
                <p class="text-xs text-gray-400 mt-1 uppercase tracking-wider">Avg. processing</p>
            </div>
            <div class="glass-card text-center py-5">
                <p class="text-2xl md:text-3xl font-bold text-white font-mono">99.9%</p>
                <p class="text-xs text-gray-400 mt-1 uppercase tracking-wider">Success rate</p>
            </div>
        </div>

        <!-- Withdrawals Table -->
        <div class="glass-card overflow-hidden p-0">
            <div class="p-5 border-b border-white/5 flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <div class="relative flex h-3 w-3">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                    </div>
                    <h3 class="font-bold text-white text-sm uppercase tracking-wider">Recent Withdrawals</h3>
                </div>
                <span class="text-xs text-gray-500 font-mono">Real-time feed</span>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead class="bg-white/[0.03] text-gray-500 text-xs uppercase tracking-wider">
                        <tr>
                            <th class="px-5 py-3 font-medium">User</th>
                            <th class="px-5 py-3 font-medium">Amount</th>
                            <th class="px-5 py-3 font-medium hidden sm:table-cell">Method</th>
                            <th class="px-5 py-3 font-medium">Status</th>
                            <th class="px-5 py-3 font-medium text-right">Time</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-white/5">
                        {#each [
                            { name: 'Marcus T.', initials: 'MT', bg: '003D32', color: 'fff', amount: '€28,450.00', method: 'SEPA Instant', time: '12s ago', asset: 'BTC' },
                            { name: 'Julia W.', initials: 'JW', bg: '7c3aed', color: 'fff', amount: '€5,200.00', method: 'Bank Transfer', time: '34s ago', asset: 'ETH' },
                            { name: 'Ricardo P.', initials: 'RP', bg: '03d476', color: '003D32', amount: '€12,800.00', method: 'PayPal', time: '1m ago', asset: 'USDT' },
                            { name: 'Anna S.', initials: 'AS', bg: 'f97316', color: 'fff', amount: '€3,670.00', method: 'SEPA Instant', time: '2m ago', asset: 'SOL' },
                            { name: 'Thomas K.', initials: 'TK', bg: '3b82f6', color: 'fff', amount: '€41,900.00', method: 'Wire Transfer', time: '3m ago', asset: 'BTC' },
                            { name: 'Sophie L.', initials: 'SL', bg: 'ec4899', color: 'fff', amount: '€8,350.00', method: 'Bank Transfer', time: '4m ago', asset: 'XRP' },
                            { name: 'Henrik J.', initials: 'HJ', bg: '14b8a6', color: 'fff', amount: '€15,720.00', method: 'SEPA Instant', time: '5m ago', asset: 'ETH' },
                            { name: 'Clara M.', initials: 'CM', bg: 'eab308', color: '000', amount: '€6,480.00', method: 'PayPal', time: '6m ago', asset: 'BNB' },
                        ] as withdrawal}
                        <tr class="hover:bg-white/5 transition-colors group">
                            <td class="px-5 py-4">
                                <div class="flex items-center space-x-3">
                                    <img
                                        src="https://ui-avatars.com/api/?name={withdrawal.initials}&background={withdrawal.bg}&color={withdrawal.color}&bold=true"
                                        class="w-9 h-9 rounded-full border border-white/10"
                                        alt="{withdrawal.name}"
                                    />
                                    <div>
                                        <div class="text-sm font-semibold text-white group-hover:text-secondary transition-colors">{withdrawal.name}</div>
                                        <div class="text-[10px] text-gray-500 font-mono">{withdrawal.asset}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-5 py-4">
                                <span class="font-bold font-mono text-white text-sm">{withdrawal.amount}</span>
                            </td>
                            <td class="px-5 py-4 hidden sm:table-cell">
                                <span class="text-xs text-gray-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">{withdrawal.method}</span>
                            </td>
                            <td class="px-5 py-4">
                                <span class="inline-flex items-center gap-1.5 text-xs font-medium text-secondary bg-secondary/10 px-2.5 py-1 rounded-full border border-secondary/20">
                                    <span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                                    Completed
                                </span>
                            </td>
                            <td class="px-5 py-4 text-right">
                                <span class="text-xs text-gray-500 font-mono">{withdrawal.time}</span>
                            </td>
                        </tr>
                        {/each}
                    </tbody>
                </table>
            </div>

            <div class="p-4 border-t border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div class="flex items-center gap-2 text-xs text-gray-500">
                    <Icon icon="mdi:shield-check" class="text-secondary text-sm" />
                    <span>All withdrawals are verified and secured</span>
                </div>
                <a href="/signup" class="text-xs text-secondary hover:text-white transition-colors font-semibold flex items-center gap-1">
                    Start withdrawing <Icon icon="lucide:arrow-right" class="w-3 h-3" />
                </a>
            </div>
        </div>
    </div>
</section>

<!-- How it works Section -->
<section id="how-it-works" class="section-padding relative">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" aria-hidden="true"></div>
    <div class="container relative z-10">
        <div class="text-center mb-16 md:mb-20">
            <span class="text-secondary font-bold tracking-wider uppercase text-sm mb-3 block">How it works</span>
            <h2 class="text-4xl md:text-5xl font-bold mb-4">Get started in minutes</h2>
            <p class="text-gray-400 max-w-2xl mx-auto text-lg">Four simple steps to start investing with Bitpanda.</p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative">
            <!-- Step connector line (desktop) -->
            <div class="hidden lg:block absolute top-[4.5rem] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true"></div>

            {#each howItWorksSteps as step}
                <div class="glass-card text-center relative group/card flex flex-col items-center">
                    <div class="w-14 h-14 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-4 group-hover/card:bg-secondary/20 group-hover/card:border-secondary/40 transition-colors">
                        <Icon icon={step.icon} class="w-7 h-7 text-secondary" />
                    </div>
                    <span class="absolute top-4 right-4 text-2xl font-bold text-white/10 group-hover/card:text-secondary/30 transition-colors tabular-nums">{step.num}</span>
                    <h3 class="text-xl font-bold mb-2">{step.title}</h3>
                    <p class="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- Community / Support -->
<section id="community" class="py-20 border-t border-white/5">
     <div class="container relative z-10 grid md:grid-cols-2 gap-12 text-center md:text-left">
          <div>
            <span class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10 text-secondary mb-4">
                 <Icon icon="lucide:users" class="w-6 h-6" />
            </span>
            <h3 class="text-2xl font-bold mb-2">Community</h3>
            <p class="text-gray-400 mb-4">Join our online community so you can be the first to hear about company news, new products and more.</p>
             <a href="https://reddit.com/r/bitpanda" target="_blank" rel="noopener noreferrer" class="btn-outline px-6 py-2 text-sm rounded-full">Join us</a>
          </div>
           <div>
            <span class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10 text-secondary mb-4">
                 <Icon icon="lucide:help-circle" class="w-6 h-6" />
            </span>
            <h3 class="text-2xl font-bold mb-2">Contact us</h3>
            <p class="text-gray-400 mb-4">Have a question or need help? Get in touch with our support team by email or phone.</p>
             <a href="/contact" class="btn-outline px-6 py-2 text-sm rounded-full">Contact us</a>
          </div>
     </div>
</section>

<!-- Call to Action -->
<section id="cta" class="py-32 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-primary/20 pointer-events-none"></div>
    <div class="container relative z-10 text-center">
        <h2 class="text-5xl md:text-7xl font-bold mb-8">Start investing today</h2>
        <p class="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">Create your account in minutes and join the future of finance.</p>
        <a href="/signup" class="btn-primary px-12 py-5 text-xl shadow-2xl hover:shadow-secondary/30 transform hover:-translate-y-2 transition-transform">
            Get Started Now
        </a>
    </div>
</section>
