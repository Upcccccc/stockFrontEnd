// client/src/lib/api.js
const API_URL = import.meta.env.VITE_API_URL;

export const createChat = async (text) => {
      const res = await fetch(`${API_URL}/api/chats`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ text })
      });
      if (!res.ok) throw new Error('Error creating chat');
      return res.text();
};

export const getUserChats = async () => {
      const res = await fetch(`${API_URL}/api/userchats`);
      if (!res.ok) throw new Error('Error fetching chat');
      return res.json();
};

export const getChat = async (id) => {
      const res = await fetch(`${API_URL}/api/chats/${id}`);
      if (!res.ok) throw new Error('Error fetching chat');
      return res.json();
};

export const deleteChat = async (id) => {
      const res = await fetch(`${API_URL}/api/chats/${id}`, {
              method: 'DELETE'
      });
      if (!res.ok) throw new Error('Error deleting chat');
      return res.text();
};

export const updateChat = async (id, question, img) => {
      const body = img ? { question, img } : { question };
      const res = await fetch(`${API_URL}/api/chats/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error('Error updating chat');
      return res.text();
};

export const stockAnalytics = {
      getStockData: async (companyName, startDate, endDate) => {
              const params = new URLSearchParams();
              params.append('companyName', companyName);
              if (startDate) params.append('startDate', startDate);
              if (endDate) params.append('endDate', endDate);
              const res = await fetch(`${API_URL}/api/stock-data?${params.toString()}`);
              if (!res.ok) throw new Error('Failed to fetch stock data');
              return res.json();
      },

      getMonotonicTrends: async (companyName, startDate, endDate) => {
              const params = new URLSearchParams({ company_name: companyName, start_date: startDate, end_date: endDate });
              const res = await fetch(`${API_URL}/api/stocks-min-max-company?${params.toString()}`);
              if (!res.ok) throw new Error('Failed to fetch trend data');
              return res.json();
      },

      getSimilarCompanies: async (companyName, startDate, endDate) => {
              const params = new URLSearchParams({ company_name: companyName, start_date: startDate, end_date: endDate });
              const res = await fetch(`${API_URL}/api/stocks-similar-companies?${params.toString()}`);
              if (!res.ok) throw new Error('Failed to fetch similar companies data');
              return res.json();
      },

      getIndustryAnalysis: async (companyName, startDate, endDate) => {
              const params = new URLSearchParams({ company_name: companyName, start_date: startDate, end_date: endDate });
              const res = await fetch(`${API_URL}/api/stocks-industry?${params.toString()}`);
              if (!res.ok) throw new Error('Failed to fetch industry analysis data');
              return res.json();
      }
};

export const newsAPI = {
      getNewsEvents: async (companyName) => {
              const params = new URLSearchParams();
              if (companyName) params.append('company_name', companyName);
              const res = await fetch(`${API_URL}/api/news-events?${params.toString()}`);
              if (!res.ok) throw new Error('Failed to fetch news events');
              return res.json();
      },

      getSimilarNews: async (headline) => {
              const res = await fetch(`${API_URL}/api/similar-news`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ headline })
              });
              if (!res.ok) throw new Error('Failed to fetch similar news');
              return res.json();
      }
};
