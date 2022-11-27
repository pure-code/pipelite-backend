import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { RequestUser } from '../../interfaces/requestUser';
import { VacancyIdDto } from '../vacancies/dto/vacancies.dto';
import { ColumnIdDto, MoveCandidateDto } from './dto/columns.dto';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  /*
   * GET
   * */
  @Get()
  getColumns(@Request() { user }: RequestUser) {
    return this.columnsService.getColumns();
  }

  /*
   * POST
   * */
  @Post()
  createColumn(
    @Request() { user }: RequestUser,
    @Body() { vacancyId }: VacancyIdDto,
  ) {
    return this.columnsService.createColumn({
      userId: user._id,
      vacancyId,
    });
  }

  /*
   * PATCH
   * */
  @Patch(':columnId')
  moveCandidate(
    @Request() { user }: RequestUser,
    @Param() { columnId }: ColumnIdDto,
    @Body() { candidateId, newColumnId, newPosition }: MoveCandidateDto,
  ) {
    return this.columnsService.moveCandidate({
      userId: user._id,
      currentColumnId: columnId,
      candidateId,
      newColumnId,
      newPosition,
    });
  }
  //
  // /*
  //  * DELETE
  //  * */
  // @Delete(':columnId')
  // deleteColumn(
  //   @Request() { user }: RequestUser,
  //   @Param() { columnId }: ColumnIdDto,
  // ) {
  //   return this.columnsService.deleteColumn({
  //     userId: user._id,
  //     columnId,
  //   });
  // }
}
