import { Request, Response } from "express";

import { ClienteService } from "./cliente.service";

export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  async create(req: Request, res: Response) {
    try {
      const cliente = await this.clienteService.create(req.body);
      res.status(201).json(cliente);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const cliente = await this.clienteService.findAll(req.query);
      res.status(201).json(cliente);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async find(req: Request, res: Response) {
    try {
      const cliente = await this.clienteService.find({
        id: Number(req.params.id),
      });
      res.status(201).json(cliente);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const cliente = await this.clienteService.update(req.body);
      res.status(201).json(cliente);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async destroy(req: Request, res: Response) {
    try {
      const cliente = await this.clienteService.destroy({
        id: Number(req.params.id),
      });
      res.status(201).json(cliente);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
