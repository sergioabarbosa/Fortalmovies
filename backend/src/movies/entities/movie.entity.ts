import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @Prop()
  name: string;

  @Prop()
  id: mongoose.Schema.Types.ObjectId;

  @Prop()
  likes: number;
  default: 0;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
