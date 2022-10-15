import { Request, Response } from "express";

import { TipoUsuarioService } from "./tipoUsuario.service";

export class TipoUsuarioController {
  constructor(private readonly tipoUsuarioService: TipoUsuarioService) {}

  async list(req: Request, res: Response) {
    try {
      const tipoUsuario = await this.tipoUsuarioService.findAll(req.query);
      res.status(201).json(tipoUsuario);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
