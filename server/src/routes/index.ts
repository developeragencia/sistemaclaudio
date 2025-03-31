import { Router } from 'express';
import { suppliersRouter } from './suppliers';
import { paymentsRouter } from './payments';
import { taxRatesRouter } from './tax-rates';
import { auditResultsRouter } from './audit-results';

export const router = Router();

router.use('/suppliers', suppliersRouter);
router.use('/payments', paymentsRouter);
router.use('/tax-rates', taxRatesRouter);
router.use('/audit-results', auditResultsRouter); 