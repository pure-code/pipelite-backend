import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vacancy, VacancyDocument } from './vacancies.model';
import { initialVacancy } from '../../data/initial.data';
import { CreateVacancyDto, VacancyIdDto } from './dto/vacancies.dto';
import { UserId } from '../../interfaces/userId';
import { ColumnsService } from '../columns/columns.service';
import { VACANCY_NOT_FOUND_MESSAGE } from '../../constants/httpStatusMessages';

@Injectable()
export class VacanciesService {
  constructor(
    @InjectModel(Vacancy.name)
    private vacanciesModel: Model<VacancyDocument>,
    private columnsService: ColumnsService,
  ) {}

  async getVacanciesList({ userId }: UserId) {
    const vacanciesList = await this.vacanciesModel.find({ userId });

    return vacanciesList.sort((a, b) => a.createdAt - b.createdAt);
  }

  async getVacancyById({ userId, vacancyId }: UserId & VacancyIdDto) {
    const vacancy = await this.vacanciesModel
      .findOne({
        _id: vacancyId,
        userId,
      })
      .populate({
        path: 'columns',
        populate: { path: 'list' },
      });

    if (!vacancy) {
      throw new NotFoundException(VACANCY_NOT_FOUND_MESSAGE);
    }

    return vacancy;
  }

  async createVacancy({ userId, name, link }: UserId & CreateVacancyDto) {
    const newVacancy = await new this.vacanciesModel(
      initialVacancy({ name, link, userId }),
    ).save();

    newVacancy.columns = await this.columnsService.createInitialColumns({
      userId,
      vacancyId: newVacancy._id.toString(),
    });

    return newVacancy.save();
  }

  async deleteVacancy({ userId, vacancyId }: UserId & VacancyIdDto) {
    return this.vacanciesModel.deleteOne({
      _id: vacancyId,
      userId,
    });
  }

  async updateVacancy({
    vacancyId,
    userId,
    link,
    name,
  }: UserId & VacancyIdDto & CreateVacancyDto) {
    return this.vacanciesModel.updateOne(
      {
        _id: vacancyId,
        userId,
      },
      {
        $set: { link, name },
      },
    );
  }
}
