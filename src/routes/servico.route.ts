import { Router } from "express";
import { DataSource } from "typeorm";

import { connToDS } from "../database/connection";
import { Servico } from "../entity/servico";
import { ServicoController } from "../modules/servico/servico.controller";
import { ServicoService } from "../modules/servico/servico.service";

export const servicoRouter = Router();

const servicoFactory = async () => {
  const dataSourceConn: DataSource = await connToDS();
  const servicoRepo = dataSourceConn.getRepository(Servico);

  const servicoService = new ServicoService(servicoRepo);
  const servicoController = new ServicoController(servicoService);

  return servicoController;
};

servicoRouter.get("/", async (req, res) => {
  const servicoController = await servicoFactory();
  return servicoController.list(req, res);
});

servicoRouter.get("/:id", async (req, res) => {
  const servicoController = await servicoFactory();
  return servicoController.find(req, res);
});

servicoRouter.post("/", async (req, res) => {
  const servicoController = await servicoFactory();
  return servicoController.create(req, res);
});

servicoRouter.put("/:id", async (req, res) => {
  const servicoController = await servicoFactory();
  return servicoController.update(req, res);
});

servicoRouter.delete("/:id", async (req, res) => {
  const servicoController = await servicoFactory();
  return servicoController.destroy(req, res);
});
