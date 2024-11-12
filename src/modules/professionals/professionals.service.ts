// backend/src/professionals/professionals.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Professional } from './schemas/professionals.schema';
import { CreateProfessionalDto } from './dto/create-user.dto';

@Injectable()
export class ProfessionalsService {
  constructor(@InjectModel(Professional.name) private professionalModel: Model<Professional>) {}

  async create(createProfessionalDto: CreateProfessionalDto): Promise<Professional> {
    const createdProfessional = new this.professionalModel(createProfessionalDto);
    return createdProfessional.save();
  }

  async findAll(): Promise<Professional[]> {
    return this.professionalModel.find().exec();
  }

  async findOne(id: string): Promise<Professional> {
    return this.professionalModel.findById(id).exec();
  }

  async delete(id: string): Promise<Professional> {
    return this.professionalModel.findByIdAndDelete(id).exec();
  }

  async update(id: string, createProfessionalDto: CreateProfessionalDto): Promise<Professional> {
    return this.professionalModel.findByIdAndUpdate(id, createProfessionalDto, { new: true }).exec();
  }
}
