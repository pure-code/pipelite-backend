import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Column } from '../columns/columns.model';

export type VacancyDocument = Vacancy & mongoose.Document;

@Schema()
export class Vacancy {
  @Prop()
  userId: string;
  @Prop()
  name: string;
  @Prop()
  link: string;
  @Prop({ type: mongoose.Schema.Types.Array, ref: Column.name })
  columns: string[];
  @Prop()
  createdAt: number;
}

export const VacancySchema = SchemaFactory.createForClass(Vacancy);
