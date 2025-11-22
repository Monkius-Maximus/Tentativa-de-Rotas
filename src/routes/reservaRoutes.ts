import { Router } from 'express';
import {
  getAllReservas,
  getReservaById,
  createReserva,
  updateReserva,
  deleteReserva
} from '../controllers/reservaController';

const router = Router();

router.get('/', getAllReservas);
router.get('/:id', getReservaById);
router.post('/', createReserva);
router.put('/:id', updateReserva);
router.delete('/:id', deleteReserva);

export default router;
