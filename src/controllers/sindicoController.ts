import { Request, Response } from 'express';
import prisma from '../prisma';

// Get all sindicos
export const getAllSindicos = async (req: Request, res: Response) => {
  try {
    const sindicos = await prisma.sindico.findMany({
      include: {
        morador: {
          include: {
            usuario: true
          }
        },
        financas: true,
        ordens_servico: true
      }
    });
    res.json(sindicos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar síndicos' });
  }
};

// Get sindico by CPF
export const getSindicoByCpf = async (req: Request, res: Response) => {
  try {
    const { cpf } = req.params;
    const sindico = await prisma.sindico.findUnique({
      where: { cpf_sindico: cpf },
      include: {
        morador: {
          include: {
            usuario: true
          }
        },
        financas: true,
        ordens_servico: true
      }
    });
    if (!sindico) {
      return res.status(404).json({ error: 'Síndico não encontrado' });
    }
    res.json(sindico);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar síndico' });
  }
};

// Create sindico
export const createSindico = async (req: Request, res: Response) => {
  try {
    const { cpf_sindico, inicio_mandato, fim_mandato } = req.body;
    const sindico = await prisma.sindico.create({
      data: {
        cpf_sindico,
        inicio_mandato: new Date(inicio_mandato),
        fim_mandato: new Date(fim_mandato)
      }
    });
    res.status(201).json(sindico);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar síndico' });
  }
};

// Update sindico
export const updateSindico = async (req: Request, res: Response) => {
  try {
    const { cpf } = req.params;
    const { inicio_mandato, fim_mandato } = req.body;
    const sindico = await prisma.sindico.update({
      where: { cpf_sindico: cpf },
      data: {
        inicio_mandato: inicio_mandato ? new Date(inicio_mandato) : undefined,
        fim_mandato: fim_mandato ? new Date(fim_mandato) : undefined
      }
    });
    res.json(sindico);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar síndico' });
  }
};

// Delete sindico
export const deleteSindico = async (req: Request, res: Response) => {
  try {
    const { cpf } = req.params;
    await prisma.sindico.delete({
      where: { cpf_sindico: cpf }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar síndico' });
  }
};
