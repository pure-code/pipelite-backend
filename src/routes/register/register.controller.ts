import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { Public } from '../../helpers/isPublicRoute';
import { RegisterService } from './register.service';
import { Throttle } from '@nestjs/throttler';

@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Throttle(3, 60)
  @Public()
  @Post()
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.registerService.registerUser(registerUserDto);
  }
}
