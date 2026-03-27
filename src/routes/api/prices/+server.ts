import { json } from '@sveltejs/kit';

const MOCK_DATA = {
    bitcoin: { eur: 64230.50, eur_24h_change: -1.2 },
    ethereum: { eur: 3210.10, eur_24h_change: 2.5 },
    solana: { eur: 145.20, eur_24h_change: 5.4 },
    binancecoin: { eur: 540.00, eur_24h_change: -0.5 },
    ripple: { eur: 0.55, eur_24h_change: 1.1 },
    cardano: { eur: 0.45, eur_24h_change: -0.8 }
};

export async function GET() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin,ripple,cardano&vs_currencies=eur&include_24hr_change=true');
        
        if (!response.ok) {
            console.warn(`Upstream API failed: ${response.status}. Using mock data.`);
            return json(MOCK_DATA);
        }

        const data = await response.json();
        
        return json(data, {
            headers: {
                'Cache-Control': 'public, max-age=60'
            }
        });
    } catch (error) {
        console.error('Proxy Fetch Error:', error);
        // Fallback to mock data on ANY error (network, rate limit, etc.)
        return json(MOCK_DATA);
    }
}
