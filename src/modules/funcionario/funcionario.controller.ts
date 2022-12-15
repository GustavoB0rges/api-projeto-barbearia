import { Request, Response } from "express";

import { FuncionarioService } from "./funcionario.service";

export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  async create(req: Request, res: Response) {
    try {
      const funcionario = await this.funcionarioService.create(req.body);
      res.status(201).json(funcionario);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const funcionario = await this.funcionarioService.findAll(req.query);
      res.status(201).json(funcionario);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async find(req: Request, res: Response) {
    try {
      const funcionario = await this.funcionarioService.find({
        id: Number(req.params.id),
      });
      res.status(201).json(funcionario);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const funcionario = await this.funcionarioService.update(req.body);
      res.status(201).json(funcionario);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async destroy(req: Request, res: Response) {
    try {
      const funcionario = await this.funcionarioService.destroy({
        id: Number(req.params.id),
      });
      res.status(201).json(funcionario);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
