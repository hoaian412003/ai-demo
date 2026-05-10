import express from 'express';
import type { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/health-check', (req: Request, res: Response) => {
  res.status(200).send('Service OK');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
