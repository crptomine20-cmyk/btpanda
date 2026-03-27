<script>
    import Icon from '@iconify/svelte';
    import { market } from '$lib/stores/market.svelte';
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <!-- Cryptocurrencies Card -->
    <div class="md:col-span-2 bg-[#0F1412] rounded-3xl p-8 relative overflow-hidden group border border-white/5 hover:border-white/10 transition-colors">
       <div class="w-12 h-12 rounded-2xl bg-[#00D16C] flex items-center justify-center mb-6">
             <Icon icon="cryptocurrency:btc" class="w-7 h-7 text-white" />
        </div>
        <h3 class="text-2xl font-bold text-white mb-4">Cryptocurrencies</h3>
        <p class="text-gray-400 leading-relaxed mb-12 max-w-xs text-sm">
            Buy, sell, and swap the cryptocurrencies you want anytime, anywhere.
        </p>
        
        <div class="flex space-x-3 mt-auto">
             <div class="bg-[#1F2523] w-10 h-10 rounded-xl flex items-center justify-center border border-white/5">
                 <Icon icon="cryptocurrency:btc" width="20" height="20" class="text-orange-500"/>
             </div>
             <div class="bg-[#1F2523] w-10 h-10 rounded-xl flex items-center justify-center border border-white/5">
                 <Icon icon="cryptocurrency:eth" width="20" height="20" class="text-blue-500"/>
             </div>
             <div class="bg-[#1F2523] w-10 h-10 rounded-xl flex items-center justify-center border border-white/5">
                 <Icon icon="cryptocurrency:sol" width="20" height="20" class="text-purple-500"/>
             </div>
        </div>
    </div>
  
    <!-- Precious Metals Card -->
    <div class="bg-[#0F1412] rounded-3xl p-8 relative overflow-hidden group border border-white/5 hover:border-white/10 transition-colors">
        <div class="w-12 h-12 rounded-2xl bg-[#596673] flex items-center justify-center mb-6">
             <Icon icon="lucide:layers" class="w-7 h-7 text-white" />
        </div>
        <h3 class="text-2xl font-bold text-white mb-4">Precious Metals</h3>
        <p class="text-gray-400 text-sm leading-relaxed max-w-xs">
            Diversify your portfolio by investing in physically-backed precious metals.
        </p>
    </div>
  
    <!-- Stocks & ETFs Card -->
    <div class="md:col-span-3 bg-[#0F1412] rounded-3xl p-8 relative overflow-hidden group border border-white/5 hover:border-white/10 transition-colors flex flex-col md:flex-row items-center justify-between gap-8">
        <div class="flex-1 max-w-xl">
            <div class="w-12 h-12 rounded-2xl bg-[#FF4F16] flex items-center justify-center mb-6">
                 <Icon icon="lucide:bar-chart-2" class="w-7 h-7 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">Stocks & ETFs</h3>
            <p class="text-gray-400 leading-relaxed mb-8 text-sm">
                Trade 10,000+ stocks, ETFs and ETCs. Buy whole or fractional shares at €1 fee per trade.
            </p>
            <button class="text-[#00D16C] font-bold hover:text-[#00B05C] transition-colors flex items-center text-sm">
                Invest now <Icon icon="lucide:arrow-right" class="w-4 h-4 ml-1" />
            </button>
        </div>
        
        <!-- Decoration / UI Mockup -->
        <div class="w-full max-w-md">
            <div class="bg-[#0A0D0C] border border-white/5 rounded-2xl p-4 shadow-2xl">
                <div class="space-y-1">
                    <div class="flex justify-between items-center p-3 hover:bg-white/5 rounded-xl transition-colors cursor-default">
                        <div class="flex items-center space-x-3">
                            <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black font-bold text-[10px]">TSLA</div>
                            <div class="text-sm font-bold text-white">Tesla Inc.</div>
                        </div>
                        <div class="text-sm font-bold text-white">€{market.data.TSLA ? market.data.TSLA.price.toFixed(2) : '245.32'}</div>
                    </div>
                     <div class="flex justify-between items-center p-3 hover:bg-white/5 rounded-xl transition-colors cursor-default">
                         <div class="flex items-center space-x-3">
                            <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black font-bold text-[10px]">AAPL</div>
                            <div class="text-sm font-bold text-white">Apple Inc.</div>
                        </div>
                        <div class="text-sm font-bold text-white">€{market.data.AAPL ? market.data.AAPL.price.toFixed(2) : '185.90'}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
