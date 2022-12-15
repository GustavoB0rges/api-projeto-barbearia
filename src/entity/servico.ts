import { Funcionario } from './funcionario';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: "servicos" })
export class Servico {
  @PrimaryGeneratedColumn({ name: "id_servico" })
  id: number;

  @Column({ nullable: true })
  descricao: string;

  @Column({ type: 'decimal', nullable: true })
  valor: number;


  // @OneToMany(() => Agendamento, (pessoa) => pessoa.cliente)
  // pessoa: Agendamento[];

  @ManyToOne(() => Funcionario, (funcionario) => funcionario.id, { cascade: true })
  @JoinColumn({ name: "id_funcionario" })
  funcionario: Funcionario;

}
