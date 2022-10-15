import { Repository } from "typeorm";

import { TipoUsuario } from "../../entity/tipo_usuario";
import { ListTipoUsuarioDto } from "./tipoUsuario.dto";

export class TipoUsuarioService {
  constructor(private readonly repo: Repository<TipoUsuario>) {}

  async findAll(dto: ListTipoUsuarioDto) {
    try {
      return await this.repo.find({
        take: dto.take || 10,
        skip: dto.skip || 0,
        order: {
          id: "DESC",
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
