import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { userInfo } from 'os';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  async getAllUsers() {
    const users = await this.userService.findAll();

    return users;
  }

  @Post()
  async createNewUSer(@Body() userInfo) {
    const user = await this.userService.create(userInfo);

    return user;
  }
}
