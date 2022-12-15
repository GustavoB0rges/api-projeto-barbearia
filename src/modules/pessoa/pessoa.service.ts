import { Pessoa } from './../../entity/pessoa';
import { Repository } from "typeorm";

import {
  LoginDto,
} from "./pessoa.dto";
import { createToken } from '../../utils/jwt';
import { compare } from 'bcryptjs';

export class PessoaService {
  constructor(private readonly repo: Repository<Pessoa>) {}

  async login(data: LoginDto) {
    try {
      const { senha, email } = data;

      const pessoa: Pessoa | any = await this.findEmail(email, [1]);

    if (!pessoa?.email) {
      throw new Error('Email não encontrado!!');
    }
    
    const samePassword = await compare(senha, pessoa.senha);
    
    if (!samePassword) {
      throw new Error('Dados incorretos!!');
    }
    const token = createToken({ ...pessoa });
    
    return { data: pessoa, token };
    } catch (error) {
      throw error;
    }
  }

  async findEmail(email: string, status?: number[]) {
    const pessoa = await this.repo.findOne({
      where: {
        email: email,
      },
    });
    return pessoa;
  }
}
