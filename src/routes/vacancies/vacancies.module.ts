import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VacanciesService } from './vacancies.service';
import { Vacancy, VacancySchema } from './vacancies.model';
import { VacanciesController } from './vacancies.controller';
import { ColumnsModule } from '../columns/columns.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vacancy.name, schema: VacancySchema }]),
    ColumnsModule,
  ],
  providers: [VacanciesService],
  controllers: [VacanciesController],
  exports: [VacanciesService],
})
export class VacanciesModule {}
