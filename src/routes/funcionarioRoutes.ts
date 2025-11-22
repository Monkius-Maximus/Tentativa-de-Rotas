import { Router } from 'express';
import {
  getAllFuncionarios,
  getFuncionarioByCpf,
  createFuncionario,
  updateFuncionario,
  deleteFuncionario
} from '../controllers/funcionarioController';

const router = Router();

router.get('/', getAllFuncionarios);
router.get('/:cpf', getFuncionarioByCpf);
router.post('/', createFuncionario);
router.put('/:cpf', updateFuncionario);
router.delete('/:cpf', deleteFuncionario);

export default router;
