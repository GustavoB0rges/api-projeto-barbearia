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

export interface CreateAdministradorDto {
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

export interface ListAdministradorDto {
  skip?: number;
  take?: number;
  search?: string;
}

export interface FindAdministradorDto {
  id: number;
}

export interface DestroyAdministradorDto {
  id: number;
}

export interface UpdateAdministradorDto {
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
