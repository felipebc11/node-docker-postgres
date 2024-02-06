import { inject, injectable } from 'inversify';

import { UserRepository } from '../infrastructure/repositories/user.repository';
import { User } from '../domain/entity/User';
import { CreateUserParams } from '../infrastructure/repositories/types/create-user.type';
import { AuthService } from '../infrastructure/auth/auth.service';
import { DefaultErrorMessages } from '../domain/enums/default-messages/default-error-messages';
import { UnauthorizedException } from '../domain/exceptions/Exceptions';

@injectable()
export class UserApplication {
  constructor(@inject(UserRepository) private userRepository: UserRepository) {}

  public async getUser(params: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOne(params);

    return user;
  }

  public async createUser(userData: CreateUserParams): Promise<string> {
    const hashedPassword = await AuthService.hashPassword(userData.password);

    return await this.userRepository.save({ ...userData, password: hashedPassword });
  }

  public async login(email: string, password: string): Promise<string> {
    const user = await this.getUser({ email });

    const isPasswordValid = await AuthService.verifyPassword(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(DefaultErrorMessages.INVALID_PASSWORD);
    }

    const token = await AuthService.createToken({ email, id: String(user.uuid), scopes: [user.role] });

    return token;
  }
}
