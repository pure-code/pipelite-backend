import { Injectable } from '@nestjs/common';
import { VacanciesService } from '../vacancies/vacancies.service';
import { CandidatesService } from '../candidates/candidates.service';
import { demoCandidates } from '../../data/demo.data';
import { VacancyDocument } from '../vacancies/vacancies.model';
import { ColumnsService } from '../columns/columns.service';

@Injectable()
export class CreateDemoDataService {
  constructor(
    private readonly candidatesService: CandidatesService,
    private readonly vacanciesService: VacanciesService,
    private readonly columnsService: ColumnsService,
  ) {}

  async createDemoData(userId: string) {
    await this.createDemoVacancy(userId);
  }

  async createDemoVacancy(userId: string) {
    const newVacancy = await this.vacanciesService.createVacancy({
      userId,
      name: 'Senior React-разработчик',
      link: 'https://career.habr.com/',
    });

    this.createDemoCandidates(userId, newVacancy);
  }

  async createDemoCandidates(userId: string, vacancy: VacancyDocument) {
    for (let i = 0; i < demoCandidates.length; i++) {
      const newCandidate = await this.candidatesService.createCandidate({
        userId,
        author: '',
        newCandidateInfo: {
          ...demoCandidates[i],
          vacancyId: vacancy._id.toString(),
        },
      });
      if (i > 5 && i <= 8) {
        await this.columnsService.moveCandidate({
          userId,
          candidateId: newCandidate._id.toString(),
          currentColumnId: vacancy.columns[0],
          newColumnId: vacancy.columns[1],
          newPosition: i - 6,
        });
      }
      if (i > 8 && i < 11) {
        await this.columnsService.moveCandidate({
          userId,
          candidateId: newCandidate._id.toString(),
          currentColumnId: vacancy.columns[0],
          newColumnId: vacancy.columns[2],
          newPosition: i - 9,
        });
      }
      if (i > 10) {
        await this.columnsService.moveCandidate({
          userId,
          candidateId: newCandidate._id.toString(),
          currentColumnId: vacancy.columns[0],
          newColumnId: vacancy.columns[3],
          newPosition: 0,
        });
      }
    }
  }
}
