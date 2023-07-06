import { UserModel } from '../routes/users/user.model';
import { Vacancy } from '../routes/vacancies/vacancies.model';
import { Candidate } from '../routes/candidates/candidate.model';
import { NewCandidateDto } from '../routes/candidates/dto/candidate.dto';
import { UserId } from '../interfaces/userId';
import { Column, columnNames } from '../routes/columns/columns.model';

export const initialUser = ({
  userEmail,
  firstName,
  passwordHash,
}: Omit<UserModel, 'registrationAt'>): UserModel => ({
  userEmail,
  firstName,
  passwordHash,
  registrationAt: Date.now(),
});

export const initialVacancy = ({
  name,
  link,
  userId,
}: Omit<Vacancy, 'createdAt' | 'columns'>): Vacancy => ({
  userId,
  name,
  link,
  createdAt: Date.now(),
  columns: [],
});

export const initialCandidate = ({
  userId,
  vacancyId,
  name,
  grade,
  comment,
  tags,
  contact,
  link,
}: UserId & NewCandidateDto): Candidate => ({
  userId,
  vacancyId,
  name,
  grade,
  comment,
  tags,
  contact,
  link,
  createdAt: Date.now(),
});

export const initialColumn = ({
  type,
  userId,
  vacancyId,
}: Omit<Column, 'list' | 'title'>): Column => ({
  userId,
  vacancyId,
  type,
  title: columnNames[type],
  list: [],
});
