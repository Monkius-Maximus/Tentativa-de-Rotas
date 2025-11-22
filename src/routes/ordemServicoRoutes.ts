import { Router } from 'express';
import {
  getAllOrdensServico,
  getOrdemServicoById,
  createOrdemServico,
  updateOrdemServico,
  deleteOrdemServico
} from '../controllers/ordemServicoController';

const router = Router();

router.get('/', getAllOrdensServico);
router.get('/:id', getOrdemServicoById);
router.post('/', createOrdemServico);
router.put('/:id', updateOrdemServico);
router.delete('/:id', deleteOrdemServico);

export default router;
