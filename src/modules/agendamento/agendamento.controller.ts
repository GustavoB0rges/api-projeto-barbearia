import { Request, Response } from "express";

import { AgendamentoService } from "./agendamento.service";

export class AgendamentoController {
  constructor(private readonly agendamentosService: AgendamentoService) {}

  async create(req: Request, res: Response) {
    try {
      const agendamentos = await this.agendamentosService.create(req.body);
      res.status(201).json(agendamentos);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const agendamentos = await this.agendamentosService.findAll(req.query);
      res.status(201).json(agendamentos);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async find(req: Request, res: Response) {
    try {
      const agendamentos = await this.agendamentosService.find({
        id: Number(req.params.id),
      });
      res.status(201).json(agendamentos);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const agendamentos = await this.agendamentosService.update(req.body);
      res.status(201).json(agendamentos);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async destroy(req: Request, res: Response) {
    try {
      const agendamentos = await this.agendamentosService.destroy({
        id: Number(req.params.id),
      });
      res.status(201).json(agendamentos);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
