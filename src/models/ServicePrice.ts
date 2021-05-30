import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne
} from 'typeorm';

import Company from './Companies';

@Entity('service_price')
class ServicesPrice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_company: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'id' })
  company: Company;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column('decimal', { precision: 16, scale: 4 })
  value: number;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ServicesPrice;
