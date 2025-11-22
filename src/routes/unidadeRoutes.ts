import { Router } from 'express';
import {
  getAllUnidades,
  getUnidadeById,
  createUnidade,
  updateUnidade,
  deleteUnidade
} from '../controllers/unidadeController';

const router = Router();

router.get('/', getAllUnidades);
router.get('/:id', getUnidadeById);
router.post('/', createUnidade);
router.put('/:id', updateUnidade);
router.delete('/:id', deleteUnidade);

export default router;
