export interface ListAgendamentoDto {
  skip?: number;
  take?: number;
  search?: string;
}

export interface ServicoDto {
  id: number;
}
export interface FuncionarioDto {
  id: number;
}

export interface FindAgendamentoDto {
  id: number;
}

export interface DestroyAgendamentoDto {
  id: number;
}

export interface CreateAgendamentoDto {
  nome_cliente: string,
  dt_cadastro?: string,
  dt_ini?: string,
  dt_fim?: string,
  histServicos: string,
  valor: number,
  status: string,
  // servico: Servico,
  funcionario: FuncionarioDto
}

export interface UpdateAgendamentoDto {
  id: number;
  nome_cliente: string,
  dt_cadastro?: string,
  dt_ini?: string,
  dt_fim?: string,
  histServicos: string,
  valor: number,
  status: string,
  // servico: ServicoDto,
  funcionario: FuncionarioDto,
}
