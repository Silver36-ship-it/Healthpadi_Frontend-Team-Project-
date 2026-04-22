const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export interface SearchResult {
  facility_id: number;
  facility_name: string;
  facility_city: string;
  facility_state: string;
  facility_type: string;
  facility_address: string;
  rating: string;
  latitude: string | null;
  longitude: string | null;
  procedure_name: string;
  price: string;
  price_source: string;
  community_submission_count: number;
  last_verified: string | null;
  is_price_stale: boolean;
}

export interface Facility {
  facility_id: number;
  facility_name: string;
  facility_address: string;
  facility_city: string;
  facility_state: string;
  facility_type: string;
  latitude: string | null;
  longitude: string | null;
  phone: string | null;
  rating: string | number | null;
  is_verified: boolean;
  is_claimed: boolean;
  pricing: Array<{
    id: number;
    procedure_name: string;
    price: string;
    price_source: string;
    is_stale?: boolean;
    last_verified: string;
  }>;
}

export const api = {
  search: async (query: string, city?: string, state?: string): Promise<{ results: SearchResult[], facilities: any[] }> => {
    const params = new URLSearchParams({ q: query });
    if (city) params.append('city', city);
    if (state) params.append('state', state);
    
    const response = await fetch(`${BASE_URL}/search/?${params.toString()}`);
    if (!response.ok) throw new Error('Search failed');
    return response.json();
  },

  getFacility: async (id: string | number): Promise<Facility> => {
    const response = await fetch(`${BASE_URL}/facilities/${id}/`);
    if (!response.ok) throw new Error('Failed to fetch facility');
    return response.json();
  },

  getFacilities: async (): Promise<Facility[]> => {
    const response = await fetch(`${BASE_URL}/facilities/`);
    if (!response.ok) throw new Error('Failed to fetch facilities');
    return response.json();
  },

  getFacilityPricing: async (id: string | number): Promise<any[]> => {
    const response = await fetch(`${BASE_URL}/facilities/${id}/pricing/`);
    if (!response.ok) throw new Error('Failed to fetch facility pricing');
    return response.json();
  },

  submitReport: async (payload: { facility: number, procedure_name: string, price: string, visited_on?: string }): Promise<any> => {
    const token = localStorage.getItem('access_token');
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    
    // Fallback if the user isn't logged in, some backends might require auth. 
    // Assuming backend will handle anonymous if permissions are set or throw 401.
    const response = await fetch(`${BASE_URL}/facilities/community-prices/`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
         facility: payload.facility,
         procedure_name: payload.procedure_name,
         price: payload.price,
         // The real backend in community_prices might accept different keys, let's pass what's needed
         visited_on: payload.visited_on || new Date().toISOString().split('T')[0]
      })
    });
    if (!response.ok) throw new Error('Failed to submit report');
    return response.json();
  }
};
