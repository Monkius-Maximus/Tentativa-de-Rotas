import { Router } from 'express';
import {
  getAllFinancas,
  getFinancaById,
  createFinanca,
  updateFinanca,
  deleteFinanca
} from '../controllers/financasController';

const router = Router();

router.get('/', getAllFinancas);
router.get('/:id', getFinancaById);
router.post('/', createFinanca);
router.put('/:id', updateFinanca);
router.delete('/:id', deleteFinanca);

export default router;
