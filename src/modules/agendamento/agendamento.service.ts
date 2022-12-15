import { Repository } from "typeorm";
import { Agendamento } from "../../entity/agendamento";
import {
  CreateAgendamentoDto,
  DestroyAgendamentoDto,
  FindAgendamentoDto,
  ListAgendamentoDto,
  UpdateAgendamentoDto,
} from "./agendamento.dto";

export class AgendamentoService {
  constructor(private readonly repo: Repository<Agendamento>) {}

  async create(agendamento: CreateAgendamentoDto) {
    try {
      const newAgendamento = this.repo.create({
        nome_cliente: agendamento.nome_cliente,
        dt_cadastro: agendamento.dt_cadastro,
        dt_ini: agendamento.dt_ini,
        dt_fim: agendamento.dt_fim,
        status: agendamento.status,
        valor: agendamento.valor,
        histServicos: agendamento.histServicos,
        // servico: {
        //   id: agendamento.servico.id,
        // },
        // funcionario: {
        //   id: agendamento.funcionario.id,
        // },
      });

      return await this.repo.save(newAgendamento);
    } catch (error) {
      throw error;
    }
  }

  async update(agendamento: UpdateAgendamentoDto) {
    try {
      const agendamentoExists = await this.repo.findOneOrFail({
        where: {
          id: agendamento.id,
        },
        // relations: ["funcionario","servico"],
      });
      const newAgendamento = this.repo.create({
        id: agendamentoExists.id,
        nome_cliente: agendamento.nome_cliente,
        dt_cadastro: agendamento.dt_cadastro,
        dt_ini: agendamento.dt_ini,
        dt_fim: agendamento.dt_fim,
        status: agendamento.status,
        valor: agendamento.valor,
        histServicos: agendamento.histServicos,
        // servico: {
        //   id: agendamento.servico.id,
        // },
        // funcionario: {
        //   id: agendamento.funcionario.id,
        // },
      });
      return await this.repo.save(newAgendamento);
    } catch (error) {
      throw error;
    }
  }

  async findAll(dto: ListAgendamentoDto) {
    try {
      return await this.repo.find({
        take: dto.take || 10,
        skip: dto.skip || 0,
        order: {
          id: "DESC",
        },
        // relations: ["funcionario", "servico"],
      });
    } catch (error) {
      throw error;
    }
  }

  async find(dto: FindAgendamentoDto) {
    try {
      return await this.repo.findOneOrFail({
        where: {
          id: dto.id,
        },
        // relations: ["funcionario", "servico"],
      });
    } catch (error) {
      throw error;
    }
  }

  async destroy(dto: DestroyAgendamentoDto) {
    try {
      return await this.repo.delete(dto.id);
    } catch (error) {
      throw error;
    }
  }
}
