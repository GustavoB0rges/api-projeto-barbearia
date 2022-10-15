import { Router } from "express";
import { DataSource } from "typeorm";

import { connToDS } from "../database/connection";
import { Cliente } from "../entity/cliente";
import { ClienteController } from "../modules/cliente/cliente.controller";
import { ClienteService } from "../modules/cliente/cliente.service";

export const clienteRouter = Router();

const clienteFactory = async () => {
  const dataSourceConn: DataSource = await connToDS();
  const clienteRepo = dataSourceConn.getRepository(Cliente);

  const clienteService = new ClienteService(clienteRepo);
  const clienteController = new ClienteController(clienteService);

  return clienteController;
};

clienteRouter.get("/", async (req, res) => {
  const clienteController = await clienteFactory();
  return clienteController.list(req, res);
});

clienteRouter.get("/:id", async (req, res) => {
  const clienteController = await clienteFactory();
  return clienteController.find(req, res);
});

clienteRouter.post("/", async (req, res) => {
  const clienteController = await clienteFactory();
  return clienteController.create(req, res);
});

clienteRouter.put("/:id", async (req, res) => {
  const clienteController = await clienteFactory();
  return clienteController.update(req, res);
});

clienteRouter.delete("/:id", async (req, res) => {
  const clienteController = await clienteFactory();
  return clienteController.destroy(req, res);
});
