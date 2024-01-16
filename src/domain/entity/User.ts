import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from 'typeorm';

import { Address } from './Address';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
    uuid?: string;

  @Column()
    firstName: string;

  @Column()
    lastName: string;

  @Column()
    bornDate: Date;

  @Column()
    documentNumber: string;

  @Column()
    documentType: string;

  @OneToOne(() => Address, { cascade: true })
  @JoinColumn({
    name: 'address_id',
  })
    address: Address;

  @Column()
    email: string;

  @Column()
    password: string;
}
