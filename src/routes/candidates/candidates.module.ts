import { Module } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CandidatesController } from './candidates.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Candidate, CandidateSchema } from './candidate.model';
import { ColumnsModule } from '../columns/columns.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Candidate.name, schema: CandidateSchema },
    ]),
    ColumnsModule,
  ],
  providers: [CandidatesService],
  controllers: [CandidatesController],
  exports: [CandidatesService],
})
export class CandidatesModule {}
