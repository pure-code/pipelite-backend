import { IsMongoId, IsNumber, ValidateIf } from 'class-validator';

export class ColumnIdDto {
  @IsMongoId()
  columnId: string;
}

export class MoveCandidateDto {
  @IsMongoId()
  candidateId: string;
  @IsMongoId()
  newColumnId: string;
  @IsNumber()
  @ValidateIf((val) => val >= 0)
  newPosition: string;
}
