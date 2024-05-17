import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ collection: 'country_master' })
export class Country extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  code: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
