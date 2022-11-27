import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserModelDocument = UserModel & mongoose.Document;

@Schema()
export class UserModel {
  @Prop({ unique: true })
  userEmail: string;
  @Prop()
  firstName: string;
  @Prop()
  passwordHash: string;
  @Prop()
  registrationAt: number;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
