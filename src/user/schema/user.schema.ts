import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema({ collection: 'user_master' })
export class User extends Document {
    @Prop({ type: SchemaTypes.ObjectId })
    _id: string;

    @Prop()
    name: string;

    @Prop()
    middleName: string;

    @Prop()
    lastName: string;

    @Prop()
    designation: string;

    @Prop()
    mail: string;

    @Prop()
    password: string;

    @Prop()
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
