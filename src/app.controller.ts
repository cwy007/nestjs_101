import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  getUsers(): string {
    return 'Get all users';
  }

  @Get('users/:id')
  getUser(@Param('id') id: string): string {
    return `Get user ${id}`;
  }

  @Post('users')
  createUser(): string {
    return 'Create user';
  }

  @Put('users/:id')
  updateUser(@Param('id') id: string): string {
    return `Update user ${id}`;
  }

  @Delete('users/:id')
  deleteUser(@Param('id') id: string): string {
    return `Delete user ${id}`;
  }
}
