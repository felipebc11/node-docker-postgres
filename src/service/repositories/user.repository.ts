import { injectable } from 'inversify'

import { User } from '../../domain/models/user';


@injectable()
export class UserRepository {
  public async findOne(): Promise<User>  {
    const user: User = {
      id: 1,
      email: "",
      name: "",
      phoneNumbers: [],
    }

    return user;
  }

}