import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export const taxRatesRouter = Router();

const createTaxRateSchema = z.object({
  activity_code: z.string(),
  activity_description: z.string(),
  tax_rate: z.number().min(0).max(100),
  tax_type: z.enum(['ISS', 'IRRF', 'INSS', 'PIS', 'COFINS', 'CSLL']),
  minimum_value: z.number().min(0).default(0),
});

taxRatesRouter.get('/', async (req, res) => {
  const taxRates = await prisma.taxRate.findMany({
    orderBy: { activity_code: 'asc' },
  });
  return res.json(taxRates);
});

taxRatesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const taxRate = await prisma.taxRate.findUnique({
    where: { id },
  });

  if (!taxRate) {
    return res.status(404).json({ message: 'Alíquota não encontrada' });
  }

  return res.json(taxRate);
});

taxRatesRouter.post('/', async (req, res) => {
  const data = createTaxRateSchema.parse(req.body);
  const taxRate = await prisma.taxRate.create({
    data,
  });
  return res.status(201).json(taxRate);
});

taxRatesRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = createTaxRateSchema.partial().parse(req.body);
  
  const taxRate = await prisma.taxRate.update({
    where: { id },
    data,
  });

  return res.json(taxRate);
});

taxRatesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.taxRate.delete({
    where: { id },
  });
  return res.status(204).send();
}); 