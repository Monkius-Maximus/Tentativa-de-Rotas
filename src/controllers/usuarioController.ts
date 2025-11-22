import { Request, Response } from 'express';
import prisma from '../prisma';

// Get all usuarios
export const getAllUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      include: {
        morador: true,
        funcionario: true
      }
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};

// Get usuario by CPF
export const getUsuarioByCpf = async (req: Request, res: Response) => {
  try {
    const { cpf } = req.params;
    const usuario = await prisma.usuario.findUnique({
      where: { cpf },
      include: {
        morador: true,
        funcionario: true
      }
    });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
};

// Create usuario
export const createUsuario = async (req: Request, res: Response) => {
  try {
    const { cpf, prim_nome, segun_nome, terce_nome, telefone, email } = req.body;
    const usuario = await prisma.usuario.create({
      data: {
        cpf,
        prim_nome,
        segun_nome,
        terce_nome,
        telefone,
        email
      }
    });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

// Update usuario
export const updateUsuario = async (req: Request, res: Response) => {
  try {
    const { cpf } = req.params;
    const { prim_nome, segun_nome, terce_nome, telefone, email } = req.body;
    const usuario = await prisma.usuario.update({
      where: { cpf },
      data: {
        prim_nome,
        segun_nome,
        terce_nome,
        telefone,
        email
      }
    });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
};

// Delete usuario
export const deleteUsuario = async (req: Request, res: Response) => {
  try {
    const { cpf } = req.params;
    await prisma.usuario.delete({
      where: { cpf }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
};
