import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Professional extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  specialty: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone: string;
}

export const ProfessionalSchema = SchemaFactory.createForClass(Professional);
