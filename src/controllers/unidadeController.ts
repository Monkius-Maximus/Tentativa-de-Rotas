import { Request, Response } from 'express';
import prisma from '../prisma';

// Get all unidades
export const getAllUnidades = async (req: Request, res: Response) => {
  try {
    const unidades = await prisma.unidade.findMany({
      include: {
        moradores: true
      }
    });
    res.json(unidades);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar unidades' });
  }
};

// Get unidade by ID
export const getUnidadeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const unidade = await prisma.unidade.findUnique({
      where: { id_unidade: parseInt(id) },
      include: {
        moradores: true
      }
    });
    if (!unidade) {
      return res.status(404).json({ error: 'Unidade não encontrada' });
    }
    res.json(unidade);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar unidade' });
  }
};

// Create unidade
export const createUnidade = async (req: Request, res: Response) => {
  try {
    const { bloco, numero_ap, andar, metragem, vaga_garagem } = req.body;
    const unidade = await prisma.unidade.create({
      data: {
        bloco,
        numero_ap,
        andar,
        metragem,
        vaga_garagem
      }
    });
    res.status(201).json(unidade);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar unidade' });
  }
};

// Update unidade
export const updateUnidade = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { bloco, numero_ap, andar, metragem, vaga_garagem } = req.body;
    const unidade = await prisma.unidade.update({
      where: { id_unidade: parseInt(id) },
      data: {
        bloco,
        numero_ap,
        andar,
        metragem,
        vaga_garagem
      }
    });
    res.json(unidade);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar unidade' });
  }
};

// Delete unidade
export const deleteUnidade = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.unidade.delete({
      where: { id_unidade: parseInt(id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar unidade' });
  }
};
