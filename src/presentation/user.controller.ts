import { inject } from 'inversify';
import { Body, Controller, Get, Post, Query, Route } from 'tsoa';

import { User } from '../domain/entity/User';
import { UserApplication } from '../app/user.application';
import { CreateUserParams } from '../infrastructure/repositories/types/create-user.type';

@Route('users')
export class UserController extends Controller {
  constructor(@inject(UserApplication) private userApplication: UserApplication) {
    super();
  }

  @Get()
  public async getUser(@Query() documentNumber?: string): Promise<User | null> {
    return this.userApplication.getUser({
      documentNumber,
    });
  }

  @Post()
  public async createUser(@Body() userData: CreateUserParams): Promise<string> {
    return await this.userApplication.createUser(userData);
  }

  @Post('/login')
  public async login(@Body() { email, password }: { email: string; password: string }): Promise<string> {
    return this.userApplication.login(email, password);
  }
}
