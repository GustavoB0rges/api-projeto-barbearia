import { Request, Response } from "express";

import { PessoaService } from "./pessoa.service";

export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  async login(req: Request, res: Response) {
    try {
      const pessoa = await this.pessoaService.login(req.body);
      res.status(201).json(pessoa);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
