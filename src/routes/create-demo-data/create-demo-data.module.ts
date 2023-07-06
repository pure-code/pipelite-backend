import { Module } from '@nestjs/common';
import { CreateDemoDataService } from './create-demo-data.service';
import { VacanciesModule } from '../vacancies/vacancies.module';
import { CandidatesModule } from '../candidates/candidates.module';
import { ColumnsModule } from '../columns/columns.module';

@Module({
  imports: [VacanciesModule, CandidatesModule, ColumnsModule],
  providers: [CreateDemoDataService],
  exports: [CreateDemoDataService],
})
export class CreateDemoDataModule {}
