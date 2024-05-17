import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ collection: 'state_master' })
export class State extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  code: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Country' })
  country: MongooseSchema.Types.ObjectId; // Reference to Country
}

export const StateSchema = SchemaFactory.createForClass(State);
