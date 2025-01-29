import "dotenv/config";
import { createServer } from "./express.server";

const PORT = process.env.PORT;

// Sempre importa do `express.server`que criamos
const app = createServer();

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}!`);
});
