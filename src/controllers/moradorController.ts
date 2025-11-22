import { Request, Response } from 'express';
import prisma from '../prisma';

// Get all moradores
export const getAllMoradores = async (req: Request, res: Response) => {
  try {
    const moradores = await prisma.morador.findMany({
      include: {
        usuario: true,
        unidade: true,
        sindico: true
      }
    });
    res.json(moradores);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar moradores' });
  }
};

// Get morador by CPF
export const getMoradorByCpf = async (req: Request, res: Response) => {
  try {
    const { cpf } = req.params;
    const morador = await prisma.morador.findUnique({
      where: { cpf_morador: cpf },
      include: {
        usuario: true,
        unidade: true,
        sindico: true,
        ordens_servico: true,
        reservas: true
      }
    });
    if (!morador) {
      return res.status(404).json({ error: 'Morador não encontrado' });
    }
    res.json(morador);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar morador' });
  }
};

// Create morador
export const createMorador = async (req: Request, res: Response) => {
  try {
    const { cpf_morador, respons_familiar, propriet_imovel, id_unidade } = req.body;
    const morador = await prisma.morador.create({
      data: {
        cpf_morador,
        respons_familiar,
        propriet_imovel,
        id_unidade
      }
    });
    res.status(201).json(morador);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar morador' });
  }
};

// Update morador
export const updateMorador = async (req: Request, res: Response) => {
  try {
    const { cpf } = req.params;
    const { respons_familiar, propriet_imovel, id_unidade } = req.body;
    const morador = await prisma.morador.update({
      where: { cpf_morador: cpf },
      data: {
        respons_familiar,
        propriet_imovel,
        id_unidade
      }
    });
    res.json(morador);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar morador' });
  }
};

// Delete morador
export const deleteMorador = async (req: Request, res: Response) => {
  try {
    const { cpf } = req.params;
    await prisma.morador.delete({
      where: { cpf_morador: cpf }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar morador' });
  }
};
