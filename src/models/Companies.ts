import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('companies')
class Companies {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  company_name: string;

  @Column()
  name: string;

  @Column()
  registration_individuals: string;

  @Column()
  identity_document: string;

  @Column()
  site: string;

  @Column()
  email: string;

  @Column()
  cell_phone: string;

  @Column()
  phone: string;

  @Column()
  postal_code: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  complement: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  note: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Companies;
