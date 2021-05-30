import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export type SexType = 'male' | 'female';

@Entity('employees')
class Employees {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column()
  birth_date: Date;

  @Column({
    type: 'enum',
    enum: ['male', 'female'],
  })
  sex: SexType;

  @Column()
  identity_document: string;

  @Column()
  registration_individuals: string;

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
  cell_phone: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  office: string;

  @Column()
  admission_date: Date;

  @Column()
  resignation_date: Date;

  @Column()
  interval: number;

  @Column()
  start_time: string;

  @Column()
  end_time: string;

  @Column()
  break_start: string;

  @Column()
  break_end: string;

  @Column()
  note: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Employees;
