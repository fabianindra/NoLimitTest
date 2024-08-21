import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.usersService.findById(id);
  }

  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }
}
