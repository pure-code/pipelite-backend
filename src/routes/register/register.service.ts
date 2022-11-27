import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel, UserModelDocument } from '../users/user.model';
import { Model } from 'mongoose';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UsersService } from '../users/users.service';
import { HTTP_STATUS_MESSAGE_ALREADY_EXISTS } from '../../constants/httpStatusMessages';

@Injectable()
export class RegisterService {
  constructor(
    @InjectModel(UserModel.name)
    private userModel: Model<UserModelDocument>,
    private userService: UsersService,
  ) {}

  async registerUser({ userEmail, firstName, password }: RegisterUserDto) {
    const currentUser = await this.userModel.findOne({ userEmail });
    if (currentUser) {
      throw new HttpException(
        HTTP_STATUS_MESSAGE_ALREADY_EXISTS,
        HttpStatus.CONFLICT,
      );
    }

    return this.userService.createUser({
      email: userEmail,
      name: firstName,
      password,
    });
  }
}
