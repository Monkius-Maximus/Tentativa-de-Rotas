import { Router } from 'express';
import {
  getAllUsuarios,
  getUsuarioByCpf,
  createUsuario,
  updateUsuario,
  deleteUsuario
} from '../controllers/usuarioController';

const router = Router();

router.get('/', getAllUsuarios);
router.get('/:cpf', getUsuarioByCpf);
router.post('/', createUsuario);
router.put('/:cpf', updateUsuario);
router.delete('/:cpf', deleteUsuario);

export default router;
