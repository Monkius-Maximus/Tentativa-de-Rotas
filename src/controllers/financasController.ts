import { Request, Response } from 'express';
import prisma from '../prisma';

// Get all financas
export const getAllFinancas = async (req: Request, res: Response) => {
  try {
    const financas = await prisma.financas.findMany({
      include: {
        sindico: {
          include: {
            morador: {
              include: {
                usuario: true
              }
            }
          }
        }
      }
    });
    res.json(financas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar finanças' });
  }
};

// Get financa by ID
export const getFinancaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const financa = await prisma.financas.findUnique({
      where: { id_financas: parseInt(id) },
      include: {
        sindico: {
          include: {
            morador: {
              include: {
                usuario: true
              }
            }
          }
        }
      }
    });
    if (!financa) {
      return res.status(404).json({ error: 'Finança não encontrada' });
    }
    res.json(financa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar finança' });
  }
};

// Create financa
export const createFinanca = async (req: Request, res: Response) => {
  try {
    const { cpf_sindico, item_limpeza, item_manutencao, receita, despesas, impostos } = req.body;
    const financa = await prisma.financas.create({
      data: {
        cpf_sindico,
        item_limpeza,
        item_manutencao,
        receita,
        despesas,
        impostos
      }
    });
    res.status(201).json(financa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar finança' });
  }
};

// Update financa
export const updateFinanca = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { cpf_sindico, item_limpeza, item_manutencao, receita, despesas, impostos } = req.body;
    const financa = await prisma.financas.update({
      where: { id_financas: parseInt(id) },
      data: {
        cpf_sindico,
        item_limpeza,
        item_manutencao,
        receita,
        despesas,
        impostos
      }
    });
    res.json(financa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar finança' });
  }
};

// Delete financa
export const deleteFinanca = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.financas.delete({
      where: { id_financas: parseInt(id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar finança' });
  }
};
