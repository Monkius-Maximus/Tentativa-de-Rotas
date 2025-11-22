import { Router } from 'express';
import {
  getAllSindicos,
  getSindicoByCpf,
  createSindico,
  updateSindico,
  deleteSindico
} from '../controllers/sindicoController';

const router = Router();

router.get('/', getAllSindicos);
router.get('/:cpf', getSindicoByCpf);
router.post('/', createSindico);
router.put('/:cpf', updateSindico);
router.delete('/:cpf', deleteSindico);

export default router;
