import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
    id?: number;

  @Column()
    street: string;

  @Column()
    number: number;

  @Column()
    city: string;

  @Column()
    state: string;

  @Column()
    country: string;

  @Column()
    zipCode: string;
}
