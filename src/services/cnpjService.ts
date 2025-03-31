import axios from 'axios';
import { CNPJResponse } from '@/types/audit';

const API_KEY = 'l7voA9Wjb7XLFe0nUVjCmrwEXV5wK076D7XFVx4M3Z27';
const BASE_URL = 'https://www.cnpj.ws/api/v1';

export const cnpjService = {
  async fetchCNPJData(cnpj: string): Promise<CNPJResponse> {
    try {
      const formattedCNPJ = cnpj.replace(/[^\d]/g, '');
      const response = await axios.get<CNPJResponse>(`${BASE_URL}/${formattedCNPJ}`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Accept': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error('CNPJ não encontrado');
        }
        if (error.response?.status === 429) {
          throw new Error('Limite de requisições excedido');
        }
        throw new Error(`Erro ao consultar CNPJ: ${error.response?.data?.message || error.message}`);
      }
      throw new Error('Erro ao consultar CNPJ');
    }
  },

  async batchFetchCNPJData(cnpjs: string[]): Promise<CNPJResponse[]> {
    const uniqueCNPJs = [...new Set(cnpjs)];
    const results: CNPJResponse[] = [];
    const errors: { cnpj: string; error: string }[] = [];

    for (const cnpj of uniqueCNPJs) {
      try {
        const data = await this.fetchCNPJData(cnpj);
        results.push(data);
        // Aguarda 1 segundo entre as requisições para evitar rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        errors.push({
          cnpj,
          error: error instanceof Error ? error.message : 'Erro desconhecido'
        });
      }
    }

    if (errors.length > 0) {
      console.error('Erros durante a consulta em lote:', errors);
    }

    return results;
  }
}; 