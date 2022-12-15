import { Request, Response } from "express";

import { ServicoService } from "./servico.service";

export class ServicoController {
  constructor(private readonly servicosService: ServicoService) {}

  async create(req: Request, res: Response) {
    try {
      const servicos = await this.servicosService.create(req.body);
      res.status(201).json(servicos);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const servicos = await this.servicosService.findAll(req.query);
      res.status(201).json(servicos);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async find(req: Request, res: Response) {
    try {
      const servicos = await this.servicosService.find({
        id: Number(req.params.id),
      });
      res.status(201).json(servicos);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const servicos = await this.servicosService.update(req.body);
      res.status(201).json(servicos);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async destroy(req: Request, res: Response) {
    try {
      const servicos = await this.servicosService.destroy({
        id: Number(req.params.id),
      });
      res.status(201).json(servicos);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
