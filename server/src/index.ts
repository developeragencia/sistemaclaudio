import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './routes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/api', router);

// Middleware de tratamento de erros
app.use(errorHandler);

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
}); 