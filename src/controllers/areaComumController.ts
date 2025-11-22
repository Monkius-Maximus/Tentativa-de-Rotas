import { Request, Response } from 'express';
import prisma from '../prisma';

// Get all areas comuns
export const getAllAreasComuns = async (req: Request, res: Response) => {
  try {
    const areas = await prisma.areaComum.findMany({
      include: {
        reservas: true
      }
    });
    res.json(areas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar áreas comuns' });
  }
};

// Get area comum by ID
export const getAreaComumById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const area = await prisma.areaComum.findUnique({
      where: { id_area: parseInt(id) },
      include: {
        reservas: true
      }
    });
    if (!area) {
      return res.status(404).json({ error: 'Área comum não encontrada' });
    }
    res.json(area);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar área comum' });
  }
};

// Create area comum
export const createAreaComum = async (req: Request, res: Response) => {
  try {
    const { nome_area, capacidade_max } = req.body;
    const area = await prisma.areaComum.create({
      data: {
        nome_area,
        capacidade_max
      }
    });
    res.status(201).json(area);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar área comum' });
  }
};

// Update area comum
export const updateAreaComum = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome_area, capacidade_max } = req.body;
    const area = await prisma.areaComum.update({
      where: { id_area: parseInt(id) },
      data: {
        nome_area,
        capacidade_max
      }
    });
    res.json(area);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar área comum' });
  }
};

// Delete area comum
export const deleteAreaComum = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.areaComum.delete({
      where: { id_area: parseInt(id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar área comum' });
  }
};
