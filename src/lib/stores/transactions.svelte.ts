export interface Transaction {
    date: string;
    amount: string;
    currency: string;
    type: 'Deposit' | 'Withdrawal';
    status: 'Completed' | 'Processing' | 'Failed';
    details?: {
        address?: string;
        note?: string;
    };
}

export class TransactionsStore {
    data = $state<Transaction[]>([
        { date: 'July 2, 2026', amount: '244.77', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'June 26, 2026', amount: '250.34', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'June 19, 2026', amount: '293.34', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'June 12, 2026', amount: '294.77', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'May 29, 2026', amount: '344.65', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'May 16, 2026', amount: '295.58', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'May 1, 2026', amount: '101.57', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'April 27, 2026', amount: '343.85', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'April 13, 2026', amount: '97.94', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'April 10, 2026', amount: '98.03', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'April 2, 2026', amount: '195.37', currency: 'BTC', type: 'Deposit', status: 'Completed' },
        { date: 'March 30, 2026', amount: '391.30', currency: 'BTC', type: 'Deposit', status: 'Completed' },
        { date: 'March 28, 2026', amount: '49.01', currency: 'BTC', type: 'Deposit', status: 'Completed' },
        { date: 'March 27, 2026', amount: '390.96', currency: 'BTC', type: 'Deposit', status: 'Completed' },
        { date: 'March 20, 2026', amount: '382.86', currency: 'BTC', type: 'Deposit', status: 'Completed' },
        { date: 'March 20, 2026', amount: '342.86', currency: 'BTC', type: 'Deposit', status: 'Completed' },
        { date: 'March 13, 2026', amount: '107.50', currency: 'BTC', type: 'Deposit', status: 'Completed' },
        { date: 'March 6, 2026', amount: '390.62', currency: 'BTC', type: 'Deposit', status: 'Completed' },
        { date: 'February 27, 2026', amount: '97.69', currency: 'BTC', type: 'Deposit', status: 'Completed' },
        { date: 'February 27, 2026', amount: '195.45', currency: 'BTC', type: 'Deposit', status: 'Completed' },
        { date: 'February 20, 2026', amount: '295.40', currency: 'BTC', type: 'Deposit', status: 'Completed' },
        { date: 'February 14, 2026', amount: '294.12', currency: 'BTC', type: 'Deposit', status: 'Completed' },
        { date: 'February 7, 2026', amount: '197.01', currency: 'CAD (BTC Eq.)', type: 'Deposit', status: 'Completed' },
        { date: 'February 2, 2026', amount: '343.32', currency: 'CAD (BTC Eq.)', type: 'Deposit', status: 'Completed' },
        { date: 'Jan 31, 2026', amount: '68.60', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'Jan 26, 2026', amount: '245.07', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'Jan 20, 2026', amount: '98.27', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'Jan 19, 2026', amount: '196.10', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'Jan 7, 2026', amount: '196.14', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'Jan 3, 2026', amount: '147.80', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'December 29, 2025', amount: '294.16', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'December 26, 2025', amount: '98.03', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        
        // Pending Withdrawal
        { 
            date: 'Dec 22, 2025', 
            amount: '43,000.00', 
            currency: 'USD', 
            type: 'Withdrawal', 
            status: 'Processing',
            details: {
                address: '0x952ca14de93a4294743c049CdA19AB45CD8fD49B',
                note: 'from accumulated profits'
            }
        },

        { date: 'November 11, 2025', amount: '393.32', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'November 10, 2025', amount: '291.27', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'November 6, 2025', amount: '101.90', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'November 5, 2025', amount: '293.24', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'October 31, 2025', amount: '53.63', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'October 22, 2025', amount: '145.40', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'October 16, 2025', amount: '96.99', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'October 9, 2025', amount: '97.56', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'October 3, 2025', amount: '97.46', currency: 'CAD', type: 'Deposit', status: 'Completed' },
        { date: 'September 16, 2025', amount: '97.20', currency: 'CAD', type: 'Deposit', status: 'Completed' }
    ]);

    get withdrawals() {
        return this.data.filter(t => t.type === 'Withdrawal');
    }

    get deposits() {
        return this.data.filter(t => t.type === 'Deposit');
    }

    get all() {
        return this.data;
    }
    
    addTransaction(tx: Transaction) {
        this.data.unshift(tx);
    }
}

export const transactionsStore = new TransactionsStore();
