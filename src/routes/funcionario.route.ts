import { Router } from "express";
import { DataSource } from "typeorm";

import { connToDS } from "../database/connection";
import { Funcionario } from "../entity/funcionario";
import { FuncionarioController } from "../modules/funcionario/funcionario.controller";
import { FuncionarioService } from "../modules/funcionario/funcionario.service";

export const funcionarioRouter = Router();

const funcionarioFactory = async () => {
  const dataSourceConn: DataSource = await connToDS();
  const funcionarioRepo = dataSourceConn.getRepository(Funcionario);

  const funcionarioService = new FuncionarioService(funcionarioRepo);
  const funcionarioController = new FuncionarioController(funcionarioService);

  return funcionarioController;
};

funcionarioRouter.get("/", async (req, res) => {
  const funcionarioController = await funcionarioFactory();
  return funcionarioController.list(req, res);
});

funcionarioRouter.get("/:id", async (req, res) => {
  const funcionarioController = await funcionarioFactory();
  return funcionarioController.find(req, res);
});

funcionarioRouter.post("/", async (req, res) => {
  const funcionarioController = await funcionarioFactory();
  return funcionarioController.create(req, res);
});

funcionarioRouter.put("/:id", async (req, res) => {
  const funcionarioController = await funcionarioFactory();
  return funcionarioController.update(req, res);
});

funcionarioRouter.delete("/:id", async (req, res) => {
  const funcionarioController = await funcionarioFactory();
  return funcionarioController.destroy(req, res);
});
