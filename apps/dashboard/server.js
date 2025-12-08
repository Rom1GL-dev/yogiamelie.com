import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5173;

// Servir les fichiers statiques du build
app.use(express.static(path.join(__dirname, '../../dist/apps/dashboard')));

// Fallback SPA (React / Vite)
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../../dist/apps/dashboard/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Dashboard running on http://localhost:${PORT}`);
});
