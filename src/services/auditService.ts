import { Payment, Supplier, TaxRate, AuditResult } from '@/types/audit';
import { cnpjService } from './cnpjService';
import { db } from '@/lib/db';

export const auditService = {
  async processPaymentsList(payments: Payment[]): Promise<void> {
    const uniqueCNPJs = [...new Set(payments.map(p => p.cnpj_supplier))];
    const existingSuppliers = await db.supplier.findMany({
      where: {
        cnpj: {
          in: uniqueCNPJs
        }
      }
    });

    const existingCNPJs = existingSuppliers.map(s => s.cnpj);
    const missingCNPJs = uniqueCNPJs.filter(cnpj => !existingCNPJs.includes(cnpj));

    if (missingCNPJs.length > 0) {
      const cnpjData = await cnpjService.batchFetchCNPJData(missingCNPJs);
      
      // Criar novos fornecedores no banco
      await Promise.all(cnpjData.map(data => 
        db.supplier.create({
          data: {
            cnpj: data.cnpj,
            razao_social: data.razao_social,
            nome_fantasia: data.nome_fantasia,
            atividade_principal: data.atividade_principal,
            data_situacao: data.data_situacao,
            tipo: data.tipo,
            porte: data.porte,
            natureza_juridica: data.natureza_juridica,
            atividades_secundarias: data.atividades_secundarias,
            endereco: data.endereco
          }
        })
      ));
    }
  },

  async auditPayments(payments: Payment[]): Promise<AuditResult[]> {
    const results: AuditResult[] = [];

    for (const payment of payments) {
      const supplier = await db.supplier.findUnique({
        where: { cnpj: payment.cnpj_supplier }
      });

      if (!supplier) {
        throw new Error(`Fornecedor não encontrado para o CNPJ ${payment.cnpj_supplier}`);
      }

      // Buscar alíquota baseada na atividade principal
      const taxRate = await db.taxRate.findFirst({
        where: {
          activity_code: supplier.atividade_principal[0].code
        }
      });

      if (!taxRate) {
        results.push({
          id: crypto.randomUUID(),
          payment_id: payment.id,
          supplier_id: supplier.id,
          tax_rate_id: '',
          original_value: payment.payment_value,
          tax_rate: 0,
          tax_value: 0,
          tax_type: 'N/A',
          audit_date: new Date(),
          status: 'error',
          observations: 'Alíquota não encontrada para a atividade',
          created_at: new Date(),
          updated_at: new Date()
        });
        continue;
      }

      // Verificar valor mínimo para retenção
      if (payment.payment_value < taxRate.minimum_value) {
        results.push({
          id: crypto.randomUUID(),
          payment_id: payment.id,
          supplier_id: supplier.id,
          tax_rate_id: taxRate.id,
          original_value: payment.payment_value,
          tax_rate: taxRate.tax_rate,
          tax_value: 0,
          tax_type: taxRate.tax_type,
          audit_date: new Date(),
          status: 'processed',
          observations: 'Valor abaixo do mínimo para retenção',
          created_at: new Date(),
          updated_at: new Date()
        });
        continue;
      }

      // Calcular valor da retenção
      const taxValue = (payment.payment_value * taxRate.tax_rate) / 100;

      results.push({
        id: crypto.randomUUID(),
        payment_id: payment.id,
        supplier_id: supplier.id,
        tax_rate_id: taxRate.id,
        original_value: payment.payment_value,
        tax_rate: taxRate.tax_rate,
        tax_value: taxValue,
        tax_type: taxRate.tax_type,
        audit_date: new Date(),
        status: 'processed',
        created_at: new Date(),
        updated_at: new Date()
      });
    }

    // Salvar resultados no banco
    await db.auditResult.createMany({
      data: results
    });

    return results;
  },

  async getAuditResults(clientId: string, startDate?: Date, endDate?: Date): Promise<AuditResult[]> {
    return db.auditResult.findMany({
      where: {
        payment: {
          client_id: clientId,
          ...(startDate && endDate ? {
            payment_date: {
              gte: startDate,
              lte: endDate
            }
          } : {})
        }
      },
      include: {
        payment: true,
        supplier: true,
        taxRate: true
      },
      orderBy: {
        created_at: 'desc'
      }
    });
  }
}; 