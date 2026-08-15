import express from 'express';

const app = express();

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.status(200).json({
    status: 'ok',
    service: 'resq-backend',
    message: 'RESQ API is running',
  });
});

export default app;