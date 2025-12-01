import express from "express";
import cors from "cors";

const app = express();

// libera CORS para qualquer origem (Wix, etc.)
app.use(cors({ origin: "*" }));
app.use(express.json());

const RETELL_API_KEY = process.env.RETELL_API_KEY;
const RETELL_AGENT_ID = "agent_087b8a84fdc535a0974c9bb0f7";

// rota só para testar se o backend está ok
app.get("/", (req, res) => {
  res.send("Backend da Companhia está rodando ?");
});

// rota que cria a call no Retell
app.post("/create-call", async (req, res) => {
  console.log("Recebi /create-call do frontend");

  try {
    const response = await fetch("https://api.retell.ai/v2/create-web-call", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RETELL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        agent_id: RETELL_AGENT_ID,
      }),
    });

    const data = await response.json();
    console.log("Resposta do Retell:", data);
    res.json(data);
  } catch (e) {
    console.error("Erro ao criar call:", e);
    res.status(500).json({ error: "Erro ao criar call" });
  }
});

// Render define a porta via variável de ambiente
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor da Companhia rodando em http://0.0.0.0:${PORT}`);
});
