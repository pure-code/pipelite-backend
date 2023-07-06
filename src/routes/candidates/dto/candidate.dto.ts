import { IsString, IsMongoId, IsOptional, IsNotEmpty } from 'class-validator';
import { Candidate } from '../candidate.model';

export class NewCandidateDto
  implements Omit<Candidate, 'userId' | 'createdAt'>
{
  @IsMongoId()
  vacancyId: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  grade: string;
  @IsString()
  comment: string;
  @IsString()
  tags: string;
  @IsString()
  contact: string;
  @IsString()
  link: string;
}

export class CandidateIdDto {
  @IsMongoId()
  candidateId: string;
}

export class UpdateCandidateDto
  implements Omit<Candidate, 'userId' | 'vacancyId' | 'createdAt'>
{
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;
  @IsString()
  @IsOptional()
  grade: string;
  @IsString()
  @IsOptional()
  comment: string;
  @IsString()
  @IsOptional()
  tags: string;
  @IsString()
  @IsOptional()
  contact: string;
  @IsString()
  @IsOptional()
  link: string;
}
