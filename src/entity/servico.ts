import { Funcionario } from './funcionario';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Agendamento } from './agendamento';

@Entity({ name: "servicos" })
export class Servico {
  @PrimaryGeneratedColumn({ name: "id_servico" })
  id: number;

  @Column({ nullable: true })
  descricao: string;

  @Column({ type: 'decimal', nullable: true })
  valor: number;

  @ManyToOne(() => Funcionario, (funcionario) => funcionario.id, { cascade: true })
  @JoinColumn({ name: "id_funcionario" })
  funcionario: Funcionario;

  @ManyToOne(() => Servico)
  @JoinColumn({ name: 'id_servico' })
  servico: Servico;

  // @ManyToOne(() => Agendamento, (agendamento) => agendamento.servico)
  // user: Agendamento

}
