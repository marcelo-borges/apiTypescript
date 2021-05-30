import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  PrimaryColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  JoinTable
} from 'typeorm';

import Company from './Companies';
import Employee from './Employees';

@Entity('company_employee')
class CompanyEmployee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn()
  @ManyToOne(() => Company)
  @JoinColumn({ name: 'id' })
  id_company: string;

  @PrimaryColumn()
  @OneToOne(() => Employee)
  @JoinColumn({ name: 'id' })
  id_employee: string;

  @CreateDateColumn()
  created_at: Date;
}

export default CompanyEmployee;
