import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export const auditResultsRouter = Router();

const createAuditResultSchema = z.object({
  supplier_id: z.string(),
  payment_id: z.string(),
  tax_amount: z.number().min(0),
  tax_type: z.enum(['ISS', 'IRRF', 'INSS', 'PIS', 'COFINS', 'CSLL']),
  status: z.enum(['pending', 'processed', 'cancelled']).default('pending'),
  notes: z.string().optional(),
});

auditResultsRouter.get('/', async (req, res) => {
  const auditResults = await prisma.auditResult.findMany({
    orderBy: { created_at: 'desc' },
    include: {
      supplier: true,
      payment: true,
    },
  });
  return res.json(auditResults);
});

auditResultsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const auditResult = await prisma.auditResult.findUnique({
    where: { id },
    include: {
      supplier: true,
      payment: true,
    },
  });

  if (!auditResult) {
    return res.status(404).json({ message: 'Resultado de auditoria não encontrado' });
  }

  return res.json(auditResult);
});

auditResultsRouter.post('/', async (req, res) => {
  const data = createAuditResultSchema.parse(req.body);
  const auditResult = await prisma.auditResult.create({
    data,
    include: {
      supplier: true,
      payment: true,
    },
  });
  return res.status(201).json(auditResult);
});

auditResultsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = createAuditResultSchema.partial().parse(req.body);
  
  const auditResult = await prisma.auditResult.update({
    where: { id },
    data,
    include: {
      supplier: true,
      payment: true,
    },
  });

  return res.json(auditResult);
});

auditResultsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.auditResult.delete({
    where: { id },
  });
  return res.status(204).send();
}); 