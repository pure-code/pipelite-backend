import { UnauthorizedException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { WRONG_CREDENTIAL_MESSAGE } from '../../constants/httpStatusMessages';
import { JWTUser } from '../../interfaces/requestUser';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userEmail: string, password: string): Promise<any> {
    const user = await this.usersService.findUserForCheckPassword({
      userEmail,
    });

    if (!user) {
      throw new UnauthorizedException(WRONG_CREDENTIAL_MESSAGE);
    }

    const isMatchPassword = await bcrypt.compare(password, user.passwordHash);

    if (user && isMatchPassword) {
      return user;
    }

    throw new UnauthorizedException(WRONG_CREDENTIAL_MESSAGE);
  }

  async login({ userEmail, _id }: JWTUser) {
    const payload = {
      userEmail,
      _id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
