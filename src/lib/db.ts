import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const db = {
  // Suppliers
  supplier: {
    findMany: () => axios.get(`${API_URL}/suppliers`).then(res => res.data),
    findUnique: (id: string) => axios.get(`${API_URL}/suppliers/${id}`).then(res => res.data),
    create: (data: any) => axios.post(`${API_URL}/suppliers`, data).then(res => res.data),
    update: (id: string, data: any) => axios.put(`${API_URL}/suppliers/${id}`, data).then(res => res.data),
    delete: (id: string) => axios.delete(`${API_URL}/suppliers/${id}`).then(res => res.data),
  },
  // Payments
  payment: {
    findMany: () => axios.get(`${API_URL}/payments`).then(res => res.data),
    findUnique: (id: string) => axios.get(`${API_URL}/payments/${id}`).then(res => res.data),
    create: (data: any) => axios.post(`${API_URL}/payments`, data).then(res => res.data),
    update: (id: string, data: any) => axios.put(`${API_URL}/payments/${id}`, data).then(res => res.data),
    delete: (id: string) => axios.delete(`${API_URL}/payments/${id}`).then(res => res.data),
  },
  // Tax Rates
  taxRate: {
    findMany: () => axios.get(`${API_URL}/tax-rates`).then(res => res.data),
    findUnique: (id: string) => axios.get(`${API_URL}/tax-rates/${id}`).then(res => res.data),
    create: (data: any) => axios.post(`${API_URL}/tax-rates`, data).then(res => res.data),
    update: (id: string, data: any) => axios.put(`${API_URL}/tax-rates/${id}`, data).then(res => res.data),
    delete: (id: string) => axios.delete(`${API_URL}/tax-rates/${id}`).then(res => res.data),
  },
  // Audit Results
  auditResult: {
    findMany: () => axios.get(`${API_URL}/audit-results`).then(res => res.data),
    findUnique: (id: string) => axios.get(`${API_URL}/audit-results/${id}`).then(res => res.data),
    create: (data: any) => axios.post(`${API_URL}/audit-results`, data).then(res => res.data),
    update: (id: string, data: any) => axios.put(`${API_URL}/audit-results/${id}`, data).then(res => res.data),
    delete: (id: string) => axios.delete(`${API_URL}/audit-results/${id}`).then(res => res.data),
  },
}; 