
import { inject, injectable } from 'inversify'

import { User } from '../domain/models/user';
import { UserRepository } from '../service/repositories/user.repository';

@injectable()
export class UserApplication {
    constructor(@inject(UserRepository) private userRepository: UserRepository) {
    }

    public async getUsers(): Promise<Array<User>> {
      return [
        await this.userRepository.findOne(),
      ]
    }
}