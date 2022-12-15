import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Funcionario } from './funcionario';
import { Pessoa } from './pessoa';
import { Servico } from './servico';
// import { Administrador } from './administrador';
// import { Servico } from './servico';
// import { Funcionario } from './funcionario';
// import { Cliente } from './cliente';

@Entity({ name: "agendamentos" })
export class Agendamento {
  @PrimaryGeneratedColumn({ name: "id_agendamento" })
  id: number;

  @Column({ type: "timestamp" , nullable: true})
  dt_cadastro: Date;

  @Column()
  nome_cliente: string;

  @Column({ type: "timestamp", nullable: true})
  dt_ini: Date;

  @Column({ type: "timestamp", nullable: true})
  dt_fim: Date;

  @Column()
  status: string;

  @Column({ type: 'decimal', nullable: true })
  valor: number;

  @Column({ nullable: true })
  histServicos: string;

  // @OneToOne(() => Pessoa, (pessoa) => pessoa.funcionario, { cascade: true })
  // @JoinColumn({ name: "id_pessoa" })
  // pessoa: Pessoa;

  // @OneToMany(() => Servico, (servico) => servico.servico)
  // servico: Servico[]

}
