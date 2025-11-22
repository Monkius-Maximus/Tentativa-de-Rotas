import { Request, Response } from 'express';
import prisma from '../prisma';

// Get all ordens de servico
export const getAllOrdensServico = async (req: Request, res: Response) => {
  try {
    const ordens = await prisma.ordemServico.findMany({
      include: {
        morador: {
          include: {
            usuario: true
          }
        },
        sindico: {
          include: {
            morador: {
              include: {
                usuario: true
              }
            }
          }
        },
        executa_os: {
          include: {
            funcionario: {
              include: {
                usuario: true
              }
            }
          }
        }
      }
    });
    res.json(ordens);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar ordens de serviço' });
  }
};

// Get ordem de servico by ID
export const getOrdemServicoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ordem = await prisma.ordemServico.findUnique({
      where: { id_os: parseInt(id) },
      include: {
        morador: {
          include: {
            usuario: true
          }
        },
        sindico: {
          include: {
            morador: {
              include: {
                usuario: true
              }
            }
          }
        },
        executa_os: {
          include: {
            funcionario: {
              include: {
                usuario: true
              }
            }
          }
        }
      }
    });
    if (!ordem) {
      return res.status(404).json({ error: 'Ordem de serviço não encontrada' });
    }
    res.json(ordem);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar ordem de serviço' });
  }
};

// Create ordem de servico
export const createOrdemServico = async (req: Request, res: Response) => {
  try {
    const { data_abertura, data_conclusao, situacao, descricao_prob, cpf_morador, cpf_sindico } = req.body;
    const ordem = await prisma.ordemServico.create({
      data: {
        data_abertura: new Date(data_abertura),
        data_conclusao: data_conclusao ? new Date(data_conclusao) : null,
        situacao,
        descricao_prob,
        cpf_morador,
        cpf_sindico
      }
    });
    res.status(201).json(ordem);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar ordem de serviço' });
  }
};

// Update ordem de servico
export const updateOrdemServico = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data_abertura, data_conclusao, situacao, descricao_prob, cpf_morador, cpf_sindico } = req.body;
    const ordem = await prisma.ordemServico.update({
      where: { id_os: parseInt(id) },
      data: {
        data_abertura: data_abertura ? new Date(data_abertura) : undefined,
        data_conclusao: data_conclusao ? new Date(data_conclusao) : null,
        situacao,
        descricao_prob,
        cpf_morador,
        cpf_sindico
      }
    });
    res.json(ordem);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar ordem de serviço' });
  }
};

// Delete ordem de servico
export const deleteOrdemServico = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.ordemServico.delete({
      where: { id_os: parseInt(id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar ordem de serviço' });
  }
};
