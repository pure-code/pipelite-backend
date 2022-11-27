import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserModel, UserModelDocument } from './user.model';
import { HTTP_STATUS_MESSAGE_USER_NOT_EXISTS } from '../../constants/httpStatusMessages';
import { UserEmail } from '../../interfaces/userId';
import { initialUser } from '../../data/initial.data';
import { CreateDemoDataService } from '../create-demo-data/create-demo-data.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel.name)
    private userModel: Model<UserModelDocument>,
    private createDemoDataService: CreateDemoDataService,
  ) {}

  async createPasswordHash(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async findUserForCheckPassword({
    userEmail,
  }: UserEmail): Promise<UserModelDocument | undefined> {
    const user = await this.userModel.findOne({ userEmail });

    if (!user) {
      throw new HttpException(
        HTTP_STATUS_MESSAGE_USER_NOT_EXISTS,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async getUserInfoById(userId: string): Promise<Partial<UserModelDocument>> {
    const userInfo = await this.userModel.findOne({ _id: userId });

    if (!userInfo) {
      throw new HttpException(
        HTTP_STATUS_MESSAGE_USER_NOT_EXISTS,
        HttpStatus.NOT_FOUND,
      );
    }

    const { _id, userEmail, firstName, registrationAt } = userInfo;

    return {
      _id,
      userEmail,
      firstName,
      registrationAt,
    };
  }

  async createUser({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }): Promise<Partial<UserModelDocument>> {
    const passwordHash = await this.createPasswordHash(password);
    const user = new this.userModel(
      initialUser({ userEmail: email, firstName: name, passwordHash }),
    );

    const { _id } = await user.save();

    const { userEmail, firstName, registrationAt } = user;

    await this.createDemoDataService.createDemoData(_id);

    return {
      _id,
      userEmail,
      firstName,
      registrationAt,
    };
  }
}
