import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5173;

// Dossier dist correct !!
const distPath = path.join(__dirname, 'dist');

app.use(express.static(distPath));

// Fallback React
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Dashboard running on http://localhost:${PORT}`);
});
