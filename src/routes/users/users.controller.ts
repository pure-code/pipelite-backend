import { Controller, Get, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { RequestUser } from '../../interfaces/requestUser';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  /*
   * GET
   * */
  @Get()
  getUserInfoById(@Request() { user }: RequestUser) {
    return this.usersService.getUserInfoById(user._id);
  }
}
