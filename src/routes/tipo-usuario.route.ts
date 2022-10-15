import { Router } from "express";
import { DataSource } from "typeorm";

import { connToDS } from "../database/connection";
import { TipoUsuario } from "../entity/tipo_usuario";
import { TipoUsuarioController } from "../modules/tipoUsuario/tipoUsuario.controller";
import { TipoUsuarioService } from "../modules/tipoUsuario/tipoUsuario.service";

export const tipoUsuarioRouter = Router();

const tipoUsuarioFactory = async () => {
  const dataSourceConn: DataSource = await connToDS();
  const tipoUsuarioRepo = dataSourceConn.getRepository(TipoUsuario);

  const tipoUsuarioService = new TipoUsuarioService(tipoUsuarioRepo);
  const tipoUsuarioController = new TipoUsuarioController(tipoUsuarioService);

  return tipoUsuarioController;
};

tipoUsuarioRouter.get("/", async (req, res) => {
  const tipoUsuarioController = await tipoUsuarioFactory();
  return tipoUsuarioController.list(req, res);
});
