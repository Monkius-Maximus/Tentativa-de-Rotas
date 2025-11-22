import { Request, Response } from 'express';
import prisma from '../prisma';

// Get all reservas
export const getAllReservas = async (req: Request, res: Response) => {
  try {
    const reservas = await prisma.reserva.findMany({
      include: {
        area_comum: true,
        morador: {
          include: {
            usuario: true
          }
        }
      }
    });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar reservas' });
  }
};

// Get reserva by ID
export const getReservaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reserva = await prisma.reserva.findUnique({
      where: { id_reserva: parseInt(id) },
      include: {
        area_comum: true,
        morador: {
          include: {
            usuario: true
          }
        }
      }
    });
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar reserva' });
  }
};

// Create reserva
export const createReserva = async (req: Request, res: Response) => {
  try {
    const { id_area, cpf_morador, data_reserva, hora_reserva, situacao } = req.body;
    const reserva = await prisma.reserva.create({
      data: {
        id_area,
        cpf_morador,
        data_reserva: new Date(data_reserva),
        hora_reserva: new Date(hora_reserva),
        situacao: situacao || 'PENDENTE'
      }
    });
    res.status(201).json(reserva);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar reserva' });
  }
};

// Update reserva
export const updateReserva = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { situacao } = req.body;
    const reserva = await prisma.reserva.update({
      where: { id_reserva: parseInt(id) },
      data: {
        situacao
      }
    });
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar reserva' });
  }
};

// Delete reserva
export const deleteReserva = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.reserva.delete({
      where: { id_reserva: parseInt(id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar reserva' });
  }
};
