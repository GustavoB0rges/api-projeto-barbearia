export interface TipoUsuarioDto {
  id: number;
}

export interface EnderecoDto {
  id?: number;
  cep: string;
  rua: string;
  estado: string;
  cidade: string;
  bairro: string;
  num: number;
  complemento?: string;
}

export interface CreateFuncionarioDto {
  pessoa: {
    cpf: string;
    nome: string;
    dataNasc?: Date;
    telefone: string;
    celular?: string;
    email: string;
    senha: string;
    tipoUsuario: TipoUsuarioDto;
    endereco: EnderecoDto;
  };
}

export interface ListFuncionarioDto {
  skip?: number;
  take?: number;
  search?: string;
}

export interface FindFuncionarioDto {
  id: number;
}

export interface DestroyFuncionarioDto {
  id: number;
}

export interface UpdateFuncionarioDto {
  id: number;
  pessoa: {
    cpf: string;
    nome: string;
    dataNasc?: string;
    telefone: string;
    celular?: string;
    email: string;
    senha: string;
    tipoUsuario: TipoUsuarioDto;
    endereco: EnderecoDto;
  };
}
