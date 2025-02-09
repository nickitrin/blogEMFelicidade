const express = require("express");
const bodyParser = require("body-parser");
const { createClient } = require("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.0.0/+esm");

const app = express();
const port = 3000;

// Carregar variáveis de ambiente
require("dotenv").config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware para tratar JSON
app.use(bodyParser.json());

// Rota POST para login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'Login bem-sucedido!', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
