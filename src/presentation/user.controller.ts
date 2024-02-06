import { inject } from 'inversify';
import { Body, Controller, Get, Post, Query, Route, Security } from 'tsoa';
import { StatusCodes } from 'http-status-codes';

import { User } from '../domain/entity/User';
import { UserApplication } from '../app/user.application';
import { CreateUserParams } from '../infrastructure/repositories/types/create-user.type';
import { Roles } from '../domain/enums/roles';

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

  @Security('jwt', [Roles.ADMIN])
  @Post()
  public async createUser(@Body() userData: CreateUserParams): Promise<string> {
    this.setStatus(StatusCodes.CREATED);
    return await this.userApplication.createUser(userData);
  }

  @Post('/login')
  public async login(@Body() { email, password }: { email: string; password: string }): Promise<string> {
    return this.userApplication.login(email, password);
  }
}
