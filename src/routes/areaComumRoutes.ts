import { Router } from 'express';
import {
  getAllAreasComuns,
  getAreaComumById,
  createAreaComum,
  updateAreaComum,
  deleteAreaComum
} from '../controllers/areaComumController';

const router = Router();

router.get('/', getAllAreasComuns);
router.get('/:id', getAreaComumById);
router.post('/', createAreaComum);
router.put('/:id', updateAreaComum);
router.delete('/:id', deleteAreaComum);

export default router;
