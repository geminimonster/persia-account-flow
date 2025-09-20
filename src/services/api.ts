const API_BASE_URL = '/api';

export interface Account {
  id: number;
  name: string;
  type: string;
  created_at: string;
}

export interface Transaction {
  id: number;
  account_id: number;
  date: string;
  description: string | null;
  amount: number;
  created_at: string;
}

export interface DashboardSummary {
  total_balance: number;
  accounts_count: number;
  transactions_count: number;
}

export interface ChartPoint {
  date: string;
  value: number;
}

// API service functions
export const api = {
  // Health check
  async health(): Promise<{ status: string }> {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.json();
  },

  // Accounts
  async getAccounts(): Promise<Account[]> {
    const response = await fetch(`${API_BASE_URL}/accounts`);
    return response.json();
  },

  async createAccount(account: { name: string; type: string }): Promise<Account> {
    const response = await fetch(`${API_BASE_URL}/accounts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(account),
    });
    return response.json();
  },

  async updateAccount(id: number, account: Partial<Account>): Promise<Account> {
    const response = await fetch(`${API_BASE_URL}/accounts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(account),
    });
    return response.json();
  },

  async deleteAccount(id: number): Promise<void> {
    await fetch(`${API_BASE_URL}/accounts/${id}`, { method: 'DELETE' });
  },

  // Transactions
  async getTransactions(accountId?: number, limit = 100): Promise<Transaction[]> {
    const params = new URLSearchParams();
    if (accountId) params.append('account_id', accountId.toString());
    params.append('limit', limit.toString());
    
    const response = await fetch(`${API_BASE_URL}/transactions?${params}`);
    return response.json();
  },

  async createTransaction(transaction: {
    account_id: number;
    date?: string;
    description?: string;
    amount: number;
  }): Promise<Transaction> {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction),
    });
    return response.json();
  },

  async updateTransaction(id: number, transaction: Partial<Transaction>): Promise<Transaction> {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction),
    });
    return response.json();
  },

  async deleteTransaction(id: number): Promise<void> {
    await fetch(`${API_BASE_URL}/transactions/${id}`, { method: 'DELETE' });
  },

  // Dashboard stats
  async getDashboardSummary(): Promise<DashboardSummary> {
    const response = await fetch(`${API_BASE_URL}/stats/summary`);
    return response.json();
  },

  async getRecentTransactions(): Promise<Transaction[]> {
    const response = await fetch(`${API_BASE_URL}/stats/recent`);
    return response.json();
  },

  async getChartData(days = 30): Promise<ChartPoint[]> {
    const response = await fetch(`${API_BASE_URL}/stats/chart?days=${days}`);
    return response.json();
  },
};
