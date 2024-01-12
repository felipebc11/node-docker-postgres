import {
  Controller,
  Get,
  Route,
} from "tsoa";

import { inject } from 'inversify'

import { User } from '../domain/models/user';
import { UserApplication } from '../app/user.application';

@Route("users")
export class UserController extends Controller{

  constructor(
    @inject(UserApplication) private userApplication: UserApplication
  ){
    super();
  }

  @Get()
  public async getUsers(): Promise<Array<User>> {

    return this.userApplication.getUsers();
   } 
  }
