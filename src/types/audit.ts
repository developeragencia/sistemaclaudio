export interface Supplier {
  id: string;
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  atividade_principal: {
    code: string;
    text: string;
  }[];
  data_situacao: string;
  tipo: string;
  porte: string;
  natureza_juridica: string;
  atividades_secundarias: {
    code: string;
    text: string;
  }[];
  endereco: {
    logradouro: string;
    numero: string;
    complemento: string;
    cep: string;
    bairro: string;
    municipio: string;
    uf: string;
  };
  created_at: Date;
  updated_at: Date;
}

export interface Payment {
  id: string;
  client_id: string;
  supplier_id: string;
  cnpj_supplier: string;
  payment_date: Date;
  payment_value: number;
  description: string;
  invoice_number?: string;
  created_at: Date;
  updated_at: Date;
}

export interface TaxRate {
  id: string;
  activity_code: string;
  activity_description: string;
  tax_rate: number;
  tax_type: string;
  minimum_value: number;
  created_at: Date;
  updated_at: Date;
}

export interface AuditResult {
  id: string;
  payment_id: string;
  supplier_id: string;
  tax_rate_id: string;
  original_value: number;
  tax_rate: number;
  tax_value: number;
  tax_type: string;
  audit_date: Date;
  status: 'pending' | 'processed' | 'error';
  observations?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CNPJResponse {
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  data_situacao: string;
  tipo: string;
  porte: string;
  natureza_juridica: string;
  atividade_principal: {
    code: string;
    text: string;
  }[];
  atividades_secundarias: {
    code: string;
    text: string;
  }[];
  endereco: {
    logradouro: string;
    numero: string;
    complemento: string;
    cep: string;
    bairro: string;
    municipio: string;
    uf: string;
  };
} 