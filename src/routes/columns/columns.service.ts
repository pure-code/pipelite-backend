import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Column, ColumnDocument, Stages } from './columns.model';
import { Model } from 'mongoose';
import { initialColumn } from '../../data/initial.data';
import { UserId } from '../../interfaces/userId';
import { VacancyIdDto } from '../vacancies/dto/vacancies.dto';
import { ColumnIdDto } from './dto/columns.dto';
import { CandidateIdDto } from '../candidates/dto/candidate.dto';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectModel(Column.name)
    private columns: Model<ColumnDocument>,
  ) {}

  async getColumns() {
    return this.columns.find({ type: Stages.new });
  }

  async createColumn({ userId, vacancyId }: UserId & VacancyIdDto) {
    return new this.columns(
      initialColumn({ userId, vacancyId, type: Stages.new }),
    ).save();
  }

  async createInitialColumns({ userId, vacancyId }: UserId & VacancyIdDto) {
    const stagesTypes = Object.values(Stages);
    const columns = [];

    for (let i = 0; i < stagesTypes.length; i++) {
      columns.push(initialColumn({ userId, vacancyId, type: stagesTypes[i] }));
    }

    const columnsIds = await this.columns.insertMany(columns);

    return columnsIds.map((el) => el._id.toString());
  }

  async deleteColumn({ userId, columnId }: UserId & ColumnIdDto) {
    return this.columns.deleteOne({
      _id: columnId,
      userId,
    });
  }

  async addNewCandidate({
    userId,
    vacancyId,
    candidateId,
  }: UserId & VacancyIdDto & CandidateIdDto) {
    return this.columns.updateOne(
      {
        type: Stages.new,
        vacancyId,
        userId,
      },
      {
        $push: {
          list: {
            $each: [candidateId],
            $position: 0,
          },
        },
      },
    );
  }

  async moveCandidate({
    userId,
    candidateId,
    currentColumnId,
    newColumnId,
    newPosition,
  }) {
    await this.columns.updateOne(
      {
        _id: currentColumnId,
        userId,
      },
      {
        $pull: { list: candidateId },
      },
    );

    return this.columns.updateOne(
      {
        _id: newColumnId,
        userId,
      },
      {
        $push: {
          list: {
            $each: [candidateId],
            $position: newPosition,
          },
        },
      },
    );
  }
}
