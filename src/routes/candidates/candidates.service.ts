import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Candidate, CandidateDocument } from './candidate.model';
import { Model } from 'mongoose';
import { NOT_FOUND_MESSAGE } from '../../constants/httpStatusMessages';
import { initialCandidate } from '../../data/initial.data';
import {
  CandidateIdDto,
  NewCandidateDto,
  UpdateCandidateDto,
} from './dto/candidate.dto';
import { UserId } from '../../interfaces/userId';
import { ColumnsService } from '../columns/columns.service';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectModel(Candidate.name)
    private candidates: Model<CandidateDocument>,
    private columnsService: ColumnsService,
  ) {}

  async getCandidates({ userId }: UserId) {
    return this.candidates.find({
      userId,
    });
  }

  async getCandidateById({ userId, candidateId }: CandidateIdDto & UserId) {
    const candidate = await this.candidates.findOne({
      _id: candidateId,
      userId,
    });

    if (!candidate) {
      throw new NotFoundException(NOT_FOUND_MESSAGE);
    }

    return candidate;
  }

  async createCandidate({
    userId,
    newCandidateInfo,
  }: {
    userId: string;
    author: string;
    newCandidateInfo: NewCandidateDto;
  }) {
    const newCandidate = new this.candidates(
      initialCandidate({ userId, ...newCandidateInfo }),
    );

    await this.columnsService.addNewCandidate({
      userId,
      vacancyId: newCandidateInfo.vacancyId,
      candidateId: newCandidate._id.toString(),
    });

    return await newCandidate.save();
  }

  async updateCandidate({
    userId,
    candidateId,
    newCandidateInfo,
  }: {
    userId: string;
    candidateId: string;
    newCandidateInfo: UpdateCandidateDto;
  }) {
    const currentCandidate = await this.getCandidateById({
      userId,
      candidateId,
    });

    if (!currentCandidate) {
      throw new NotFoundException(NOT_FOUND_MESSAGE);
    }

    return this.candidates.updateOne(
      {
        _id: candidateId,
        userId,
      },
      {
        $set: newCandidateInfo,
      },
    );
  }

  async deleteCandidate({ userId, candidateId }: UserId & CandidateIdDto) {
    return this.candidates.deleteOne({
      _id: candidateId,
      userId,
    });
  }
}
