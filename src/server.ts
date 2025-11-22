import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import unidadeRoutes from './routes/unidadeRoutes';
import areaComumRoutes from './routes/areaComumRoutes';
import usuarioRoutes from './routes/usuarioRoutes';
import moradorRoutes from './routes/moradorRoutes';
import funcionarioRoutes from './routes/funcionarioRoutes';
import sindicoRoutes from './routes/sindicoRoutes';
import financasRoutes from './routes/financasRoutes';
import ordemServicoRoutes from './routes/ordemServicoRoutes';
import reservaRoutes from './routes/reservaRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'API SGMP funcionando!',
    version: '1.0.0',
    endpoints: {
      unidades: '/api/unidades',
      areasComuns: '/api/areas-comuns',
      usuarios: '/api/usuarios',
      moradores: '/api/moradores',
      funcionarios: '/api/funcionarios',
      sindicos: '/api/sindicos',
      financas: '/api/financas',
      ordensServico: '/api/ordens-servico',
      reservas: '/api/reservas'
    }
  });
});

// Routes
app.use('/api/unidades', unidadeRoutes);
app.use('/api/areas-comuns', areaComumRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/moradores', moradorRoutes);
app.use('/api/funcionarios', funcionarioRoutes);
app.use('/api/sindicos', sindicoRoutes);
app.use('/api/financas', financasRoutes);
app.use('/api/ordens-servico', ordemServicoRoutes);
app.use('/api/reservas', reservaRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Servidor SGMP rodando na porta ${PORT}`);
  console.log(`📍 Acesse http://localhost:${PORT}`);
});
