import { Address } from '../../../domain/entity/Address';

export interface CreateUserParams {
  firstName: string;
  lastName: string;
  bornDate: Date;
  documentNumber: string;
  documentType: string;
  address: Omit<Address, 'id'>;
  email: string;
  password: string;
}
