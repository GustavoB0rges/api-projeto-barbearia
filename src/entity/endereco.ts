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

  @Column({ nullable: true})
  cep: string;

  @Column({ nullable: true})
  rua: string;

  @Column({ nullable: true})
  estado: string;

  @Column({ nullable: true})
  cidade: string;

  @Column({ nullable: true})
  bairro: string;

  @Column({ nullable: true})
  num: number;

  @Column({ nullable: true })
  complemento: string;

  @OneToOne(() => Pessoa, (pessoa) => pessoa.endereco)
  @JoinColumn({ name: "id_pessoa" })
  pessoa: Pessoa;
}
