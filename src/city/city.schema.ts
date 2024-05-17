import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ collection: 'city_master' })
export class City extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'State' })
  state: MongooseSchema.Types.ObjectId; // Reference to State
}

export const CitySchema = SchemaFactory.createForClass(City);
