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
    const numId = parseInt(id);
    if (isNaN(numId)) {
      return res.status(400).json({ error: 'ID deve ser um número válido' });
    }
    const reserva = await prisma.reserva.findUnique({
      where: { id_reserva: numId },
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
    
    // Validate dates
    const dataReservaDate = new Date(data_reserva);
    const horaReservaDate = new Date(hora_reserva);
    
    if (isNaN(dataReservaDate.getTime())) {
      return res.status(400).json({ error: 'Data de reserva inválida' });
    }
    if (isNaN(horaReservaDate.getTime())) {
      return res.status(400).json({ error: 'Hora de reserva inválida' });
    }
    
    const reserva = await prisma.reserva.create({
      data: {
        id_area,
        cpf_morador,
        data_reserva: dataReservaDate,
        hora_reserva: horaReservaDate,
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
    const numId = parseInt(id);
    if (isNaN(numId)) {
      return res.status(400).json({ error: 'ID deve ser um número válido' });
    }
    const { situacao } = req.body;
    const reserva = await prisma.reserva.update({
      where: { id_reserva: numId },
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
    const numId = parseInt(id);
    if (isNaN(numId)) {
      return res.status(400).json({ error: 'ID deve ser um número válido' });
    }
    await prisma.reserva.delete({
      where: { id_reserva: numId }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar reserva' });
  }
};
