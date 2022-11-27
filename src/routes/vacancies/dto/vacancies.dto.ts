import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Vacancy } from '../vacancies.model';

export class VacancyIdDto {
  @IsMongoId()
  vacancyId: string;
}

export class CreateVacancyDto
  implements Omit<Vacancy, 'userId' | 'author' | 'createdAt' | 'columns'>
{
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  link: string;
}
