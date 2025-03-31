import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export const paymentsRouter = Router();

const createPaymentSchema = z.object({
  supplier_id: z.string(),
  amount: z.number().positive(),
  payment_date: z.string().transform(str => new Date(str)),
  description: z.string().optional(),
  status: z.enum(['pending', 'processed', 'cancelled']).default('pending'),
});

paymentsRouter.get('/', async (req, res) => {
  const payments = await prisma.payment.findMany({
    orderBy: { payment_date: 'desc' },
    include: {
      supplier: true,
      audit_results: true,
    },
  });
  return res.json(payments);
});

paymentsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const payment = await prisma.payment.findUnique({
    where: { id },
    include: {
      supplier: true,
      audit_results: true,
    },
  });

  if (!payment) {
    return res.status(404).json({ message: 'Pagamento não encontrado' });
  }

  return res.json(payment);
});

paymentsRouter.post('/', async (req, res) => {
  const data = createPaymentSchema.parse(req.body);
  const payment = await prisma.payment.create({
    data,
    include: {
      supplier: true,
    },
  });
  return res.status(201).json(payment);
});

paymentsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = createPaymentSchema.partial().parse(req.body);
  
  const payment = await prisma.payment.update({
    where: { id },
    data,
    include: {
      supplier: true,
    },
  });

  return res.json(payment);
});

paymentsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.payment.delete({
    where: { id },
  });
  return res.status(204).send();
}); 