import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();
app.use(cors()) //permissao de acesso 
app.use(express.json()) //middleware para verificar tipagens (robustez)
app.use('/api' ,routes);

export default app;