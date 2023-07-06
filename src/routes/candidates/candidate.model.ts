import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type CandidateDocument = Candidate & mongoose.Document;

@Schema()
export class Candidate {
  @Prop()
  userId: string;
  @Prop()
  vacancyId: string;
  @Prop()
  name: string;
  @Prop()
  grade: string;
  @Prop()
  comment: string;
  @Prop()
  tags: string;
  @Prop()
  contact: string;
  @Prop()
  link: string;
  @Prop()
  createdAt: number;
}

export const CandidateSchema = SchemaFactory.createForClass(Candidate);
