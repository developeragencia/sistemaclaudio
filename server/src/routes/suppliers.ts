import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export const suppliersRouter = Router();

const createSupplierSchema = z.object({
  cnpj: z.string().min(14).max(14),
  name: z.string().min(1),
  activity_code: z.string().optional(),
  activity_type: z.string().optional(),
  tax_regime: z.string().optional(),
});

suppliersRouter.get('/', async (req, res) => {
  const suppliers = await prisma.supplier.findMany({
    orderBy: { created_at: 'desc' },
  });
  return res.json(suppliers);
});

suppliersRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const supplier = await prisma.supplier.findUnique({
    where: { id },
    include: {
      payments: true,
      audit_results: true,
    },
  });

  if (!supplier) {
    return res.status(404).json({ message: 'Fornecedor não encontrado' });
  }

  return res.json(supplier);
});

suppliersRouter.post('/', async (req, res) => {
  const data = createSupplierSchema.parse(req.body);
  const supplier = await prisma.supplier.create({
    data,
  });
  return res.status(201).json(supplier);
});

suppliersRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = createSupplierSchema.partial().parse(req.body);
  
  const supplier = await prisma.supplier.update({
    where: { id },
    data,
  });

  return res.json(supplier);
});

suppliersRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.supplier.delete({
    where: { id },
  });
  return res.status(204).send();
}); 