import { browser } from '$app/environment';

export class MarketStore {
    data = $state({
        bitcoin: { price: 0, change: 0 },
        ethereum: { price: 0, change: 0 },
        solana: { price: 0, change: 0 },
        binancecoin: { price: 0, change: 0 },
        ripple: { price: 0, change: 0 },
        cardano: { price: 0, change: 0 },
        // Base prices for non-API assets (Stocks, Metals)
        XAU: { price: 2310.50, change: 0.15 }, // Gold
        XAG: { price: 28.45, change: -0.25 },  // Silver
        TSLA: { price: 245.32, change: 1.2 },
        AAPL: { price: 185.90, change: -0.5 },
        BEST: { price: 0.45, change: 5.2 }
    });

    constructor() {
        this.init();
    }

    async init() {
        if (browser) {
            await this.fetchPrices();
            
            // Poll every 30 seconds
            setInterval(() => this.fetchPrices(), 30000);

            // Simulate tick updates for non-API assets every 3 seconds
            setInterval(() => {
                const keys = ['XAU', 'XAG', 'TSLA', 'AAPL'] as const;
                keys.forEach(key => {
                    if (this.data[key]) {
                        const change = (Math.random() - 0.5) * 0.1; // small fluctuation
                        this.data[key].price = Number((this.data[key].price + change).toFixed(2));
                    }
                });
            }, 3000);
        }
    }

    async fetchPrices() {
        try {
            const response = await fetch('/api/prices');
            if (!response.ok) throw new Error('Proxy error');
            const data = await response.json();
            
            if (data.bitcoin) {
                this.data.bitcoin = { price: data.bitcoin.eur, change: data.bitcoin.eur_24h_change };
                this.data.ethereum = { price: data.ethereum.eur, change: data.ethereum.eur_24h_change };
                this.data.solana = { price: data.solana.eur, change: data.solana.eur_24h_change };
                this.data.binancecoin = { price: data.binancecoin.eur, change: data.binancecoin.eur_24h_change };
                this.data.ripple = { price: data.ripple.eur, change: data.ripple.eur_24h_change };
                this.data.cardano = { price: data.cardano.eur, change: data.cardano.eur_24h_change };
            }
        } catch (e) {
            console.error('Failed to fetch crypto prices:', e);
        }
    }
}

export const market = new MarketStore();
