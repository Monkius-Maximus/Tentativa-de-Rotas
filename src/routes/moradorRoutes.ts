import { Router } from 'express';
import {
  getAllMoradores,
  getMoradorByCpf,
  createMorador,
  updateMorador,
  deleteMorador
} from '../controllers/moradorController';

const router = Router();

router.get('/', getAllMoradores);
router.get('/:cpf', getMoradorByCpf);
router.post('/', createMorador);
router.put('/:cpf', updateMorador);
router.delete('/:cpf', deleteMorador);

export default router;
