import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { HTTP_STATUS_MESSAGE_FORBIDDEN } from '../../../constants/httpStatusMessages';
import { UserModelDocument } from '../../users/user.model';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'userEmail',
    });
  }

  async validate(
    userEmail: string,
    password: string,
  ): Promise<UserModelDocument> {
    const user = await this.authService.validateUser(userEmail, password);
    if (!user) {
      throw new UnauthorizedException(HTTP_STATUS_MESSAGE_FORBIDDEN);
    }
    return user;
  }
}
