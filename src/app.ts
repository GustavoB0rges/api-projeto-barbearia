import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { clienteRouter } from "./routes/cliente.route";
import { tipoUsuarioRouter } from "./routes/tipo-usuario.route";
import { funcionarioRouter } from "./routes/funcionario.route";
import { administradorRouter } from "./routes/administrador.route";
import { servicoRouter } from "./routes/servico.route";
import { agendamentoRouter } from "./routes/agendamento.route";
import "./database/connection";
import tokenValidator from "./middlewares/tokenValidator";
import { pessoaRouter } from "./routes/pessoa.route";

export const app = express();

app.use(express.json());
app.use(cors());

app.use('/login', pessoaRouter);
app.use("/clientes", tokenValidator, clienteRouter);
app.use("/funcionarios", tokenValidator, funcionarioRouter);
app.use("/agendamentos", tokenValidator, agendamentoRouter);
app.use("/administradores", tokenValidator, administradorRouter);
app.use("/servicos", tokenValidator, servicoRouter);
app.use("/tipos-usuario", tipoUsuarioRouter);
