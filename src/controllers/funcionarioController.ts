import { Request, Response } from 'express';
import prisma from '../prisma';

// Get all funcionarios
export const getAllFuncionarios = async (req: Request, res: Response) => {
  try {
    const funcionarios = await prisma.funcionario.findMany({
      include: {
        usuario: true,
        externo: true,
        interno: true
      }
    });
    res.json(funcionarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar funcionários' });
  }
};

// Get funcionario by CPF
export const getFuncionarioByCpf = async (req: Request, res: Response) => {
  try {
    const { cpf } = req.params;
    const funcionario = await prisma.funcionario.findUnique({
      where: { cpf_funcionario: cpf },
      include: {
        usuario: true,
        externo: true,
        interno: true
      }
    });
    if (!funcionario) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }
    res.json(funcionario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar funcionário' });
  }
};

// Create funcionario
export const createFuncionario = async (req: Request, res: Response) => {
  try {
    const { cpf_funcionario, matricula, expediente, salario } = req.body;
    const funcionario = await prisma.funcionario.create({
      data: {
        cpf_funcionario,
        matricula,
        expediente,
        salario
      }
    });
    res.status(201).json(funcionario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar funcionário' });
  }
};

// Update funcionario
export const updateFuncionario = async (req: Request, res: Response) => {
  try {
    const { cpf } = req.params;
    const { matricula, expediente, salario } = req.body;
    const funcionario = await prisma.funcionario.update({
      where: { cpf_funcionario: cpf },
      data: {
        matricula,
        expediente,
        salario
      }
    });
    res.json(funcionario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar funcionário' });
  }
};

// Delete funcionario
export const deleteFuncionario = async (req: Request, res: Response) => {
  try {
    const { cpf } = req.params;
    await prisma.funcionario.delete({
      where: { cpf_funcionario: cpf }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar funcionário' });
  }
};
