import { Router } from "express";
import { DataSource } from "typeorm";

import { connToDS } from "../database/connection";
import { Administrador } from "../entity/administrador";
import { AdministradorController } from "../modules/administrador/administrador.controller";
import { AdministradorService } from "../modules/administrador/administrador.service";

export const administradorRouter = Router();

const administradorFactory = async () => {
  const dataSourceConn: DataSource = await connToDS();
  const administradorRepo = dataSourceConn.getRepository(Administrador);

  const administradorService = new AdministradorService(administradorRepo);
  const administradorController = new AdministradorController(administradorService);

  return administradorController;
};

administradorRouter.get("/", async (req, res) => {
  const administradorController = await administradorFactory();
  return administradorController.list(req, res);
});

administradorRouter.get("/:id", async (req, res) => {
  const administradorController = await administradorFactory();
  return administradorController.find(req, res);
});

administradorRouter.post("/", async (req, res) => {
  const administradorController = await administradorFactory();
  return administradorController.create(req, res);
});

administradorRouter.put("/:id", async (req, res) => {
  const administradorController = await administradorFactory();
  return administradorController.update(req, res);
});

administradorRouter.delete("/:id", async (req, res) => {
  const administradorController = await administradorFactory();
  return administradorController.destroy(req, res);
});
