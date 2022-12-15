import { Router } from "express";
import { DataSource } from "typeorm";

import { connToDS } from "../database/connection";
import { Pessoa } from "../entity/pessoa";
import { PessoaController } from "../modules/pessoa/pessoa.controller";
import { PessoaService } from "../modules/pessoa/pessoa.service";

export const pessoaRouter = Router();

const pessoaFactory = async () => {
  const dataSourceConn: DataSource = await connToDS();
  const pessoaRepo = dataSourceConn.getRepository(Pessoa);

  const pessoaService = new PessoaService(pessoaRepo);
  const pessoaController = new PessoaController(pessoaService);

  return pessoaController;
};

pessoaRouter.post("/", async (req, res) => {
  const pessoaController = await pessoaFactory();
  return pessoaController.login(req, res);
});
