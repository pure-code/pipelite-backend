import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Request,
} from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import {
  NewCandidateDto,
  CandidateIdDto,
  UpdateCandidateDto,
} from './dto/candidate.dto';
import { RequestUser } from '../../interfaces/requestUser';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  /*
   * GET
   * */
  @Get()
  getCandidates(@Request() { user }: RequestUser) {
    return this.candidatesService.getCandidates({
      userId: user._id,
    });
  }

  @Get(':candidateId')
  getCandidateById(
    @Request() { user }: RequestUser,
    @Param() { candidateId }: CandidateIdDto,
  ) {
    return this.candidatesService.getCandidateById({
      userId: user._id,

      candidateId,
    });
  }

  /*
   * POST
   * */
  @Post()
  createCandidate(
    @Request() { user }: RequestUser,
    @Body() newCandidate: NewCandidateDto,
  ) {
    return this.candidatesService.createCandidate({
      userId: user._id,
      author: user.userEmail,
      newCandidateInfo: newCandidate,
    });
  }

  /*
   * PATCH
   * */
  @Patch(':candidateId')
  updateCandidate(
    @Request() { user }: RequestUser,
    @Param() { candidateId }: CandidateIdDto,
    @Body() newCandidateInfo: UpdateCandidateDto,
  ) {
    return this.candidatesService.updateCandidate({
      userId: user._id,
      candidateId,
      newCandidateInfo,
    });
  }

  /*
   * DELETE
   * */
  @Delete(':candidateId')
  deleteCandidate(
    @Request() { user }: RequestUser,
    @Param() { candidateId }: CandidateIdDto,
  ) {
    return this.candidatesService.deleteCandidate({
      userId: user._id,
      candidateId,
    });
  }
}
