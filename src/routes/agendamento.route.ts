import { Router } from "express";
import { DataSource } from "typeorm";

import { connToDS } from "../database/connection";
import { Agendamento } from "../entity/agendamento";
import { AgendamentoController } from "../modules/agendamento/agendamento.controller";
import { AgendamentoService } from "../modules/agendamento/agendamento.service";

export const agendamentoRouter = Router();

const agendamentoFactory = async () => {
  const dataSourceConn: DataSource = await connToDS();
  const agendamentoRepo = dataSourceConn.getRepository(Agendamento);

  const agendamentoService = new AgendamentoService(agendamentoRepo);
  const agendamentoController = new AgendamentoController(agendamentoService);

  return agendamentoController;
};

agendamentoRouter.get("/", async (req, res) => {
  const agendamentoController = await agendamentoFactory();
  return agendamentoController.list(req, res);
});

agendamentoRouter.get("/:id", async (req, res) => {
  const agendamentoController = await agendamentoFactory();
  return agendamentoController.find(req, res);
});

agendamentoRouter.post("/", async (req, res) => {
  const agendamentoController = await agendamentoFactory();
  return agendamentoController.create(req, res);
});

agendamentoRouter.put("/:id", async (req, res) => {
  const agendamentoController = await agendamentoFactory();
  return agendamentoController.update(req, res);
});

agendamentoRouter.delete("/:id", async (req, res) => {
  const agendamentoController = await agendamentoFactory();
  return agendamentoController.destroy(req, res);
});
