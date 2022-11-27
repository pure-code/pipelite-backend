import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { RequestUser } from '../../interfaces/requestUser';
import { CreateVacancyDto, VacancyIdDto } from './dto/vacancies.dto';

@Controller('vacancies')
export class VacanciesController {
  constructor(private readonly vacancyService: VacanciesService) {}

  /*
   * GET
   * */
  @Get()
  getVacanciesList(@Request() { user }: RequestUser) {
    return this.vacancyService.getVacanciesList({
      userId: user._id,
    });
  }

  @Get('/:vacancyId')
  getVacancyById(
    @Request() { user }: RequestUser,
    @Param() { vacancyId }: VacancyIdDto,
  ) {
    return this.vacancyService.getVacancyById({
      userId: user._id,
      vacancyId,
    });
  }

  /*
   * POST
   * */
  @Post()
  createVacancy(
    @Request() { user }: RequestUser,
    @Body() { name, link }: CreateVacancyDto,
  ) {
    return this.vacancyService.createVacancy({
      userId: user._id,
      name,
      link,
    });
  }

  /*
   * DELETE
   * */
  @Delete('/:vacancyId')
  deleteVacancy(
    @Request() { user }: RequestUser,
    @Param() { vacancyId }: VacancyIdDto,
  ) {
    return this.vacancyService.deleteVacancy({
      userId: user._id,
      vacancyId,
    });
  }

  /*
   * PATCH
   * */
  @Patch('/:vacancyId')
  updateVacancy(
    @Request() { user }: RequestUser,
    @Param() { vacancyId }: VacancyIdDto,
    @Body() { name, link }: CreateVacancyDto,
  ) {
    return this.vacancyService.updateVacancy({
      userId: user._id,
      vacancyId,
      name,
      link,
    });
  }
}
