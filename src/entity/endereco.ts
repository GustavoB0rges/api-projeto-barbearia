import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pessoa } from './pessoa';

@Entity({ name: "enderecos" })
export class Endereco {
  @PrimaryGeneratedColumn({ name: "id_endereco" })
  id: number;

  @Column()
  cep: string;

  @Column()
  rua: string;

  @Column()
  estado: string;

  @Column()
  cidade: string;

  @Column()
  bairro: string;

  @Column()
  num: number;

  @Column({ nullable: true })
  complemento: string;

  @OneToOne(() => Pessoa, (pessoa) => pessoa.endereco)
  @JoinColumn({ name: "id_pessoa" })
  pessoa: Pessoa;
}
