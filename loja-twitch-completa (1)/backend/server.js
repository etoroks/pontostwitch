const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors({ origin: 'http://localhost:5500', credentials: true }));
app.use(cookieParser());

const PORT = 3000;

// Mock session
let fakeUser = {
  username: 'Viewer123',
  points: 640000
};

// Simular login via Twitch
app.get('/auth/twitch', (req, res) => {
  res.cookie('user', JSON.stringify(fakeUser), { httpOnly: false });
  res.redirect('http://localhost:5500');
});

// API para obter dados do usuário
app.get('/api/user', (req, res) => {
  const user = req.cookies.user;
  if (user) {
    res.json(JSON.parse(user));
  } else {
    res.status(401).json({ error: 'Não autenticado' });
  }
});

app.listen(PORT, () => {
  console.log('Servidor rodando na porta', PORT);
});
