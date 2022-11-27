import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Candidate } from '../candidates/candidate.model';

export type ColumnDocument = Column & mongoose.Document;

export enum Stages {
  new = 'new',
  inProgress = 'inProgress',
  interviewed = 'interviewed',
  offer = 'offer',
}

export const columnNames = {
  [Stages.new]: 'Новые',
  [Stages.inProgress]: 'В работе',
  [Stages.interviewed]: 'Прошли интервью',
  [Stages.offer]: 'Оффер',
};

@Schema()
export class Column {
  @Prop()
  vacancyId: string;
  @Prop()
  userId: string;
  @Prop()
  type: Stages;
  @Prop()
  title: string;
  @Prop({ type: mongoose.Schema.Types.Array, ref: Candidate.name })
  list: string[];
}

export const ColumnSchema = SchemaFactory.createForClass(Column);
