import { Request, Response } from "express";

import { AdministradorService } from "./administrador.service";

export class AdministradorController {
  constructor(private readonly administradorService: AdministradorService) {}

  async create(req: Request, res: Response) {
    try {
      const administrador = await this.administradorService.create(req.body);
      res.status(201).json(administrador);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const administrador = await this.administradorService.findAll(req.query);
      res.status(201).json(administrador);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async find(req: Request, res: Response) {
    try {
      const administrador = await this.administradorService.find({
        id: Number(req.params.id),
      });
      res.status(201).json(administrador);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const administrador = await this.administradorService.update(req.body);
      res.status(201).json(administrador);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async destroy(req: Request, res: Response) {
    try {
      const administrador = await this.administradorService.destroy({
        id: Number(req.params.id),
      });
      res.status(201).json(administrador);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
