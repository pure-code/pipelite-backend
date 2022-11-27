import { UserModelDocument } from '../routes/users/user.model';

export interface RequestUser {
  user: JWTUser;
}

export type JWTUser = Pick<UserModelDocument, 'userEmail' | '_id'>;
