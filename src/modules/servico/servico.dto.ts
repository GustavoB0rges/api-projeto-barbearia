export interface TipoUsuarioDto {
  id: number;
}

export interface ListServicoDto {
  skip?: number;
  take?: number;
  search?: string;
}

export interface FindServicoDto {
  id: number;
}

export interface DestroyServicoDto {
  id: number;
}

export interface CreateServicoDto {
  descricao: string,
  valor: number
}

export interface UpdateServicoDto {
  id: number;
  descricao: string,
  valor: number
}
