import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../../helpers/isPublicRoute';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestUser } from '../../interfaces/requestUser';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Throttle(3, 60)
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post()
  login(@Request() { user }: RequestUser) {
    return this.authService.login(user);
  }
}
