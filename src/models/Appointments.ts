import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

import Company from './Companies';
import Employee from './Employees';
import ServicesPrice from './ServicePrice';
import User from './User';

@Entity('appointments')
class Appointments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_company: string;

  @Column()
  id_employee: string;

  @Column()
  id_serviceprice: string;

  @Column()
  id_user: string;

  @Column()
  date: Date;

  @Column()
  hour: Date;

  @Column('decimal', { precision: 16, scale: 4 })
  value: number;

  @Column('decimal', { precision: 16, scale: 4 })
  amount_charged: number;

  @Column({ default: false })
  service_done: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointments;
