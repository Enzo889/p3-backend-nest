import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attachment } from './entities/attachment.entity';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';

@Injectable()
export class AttachmentService {
  constructor(
    @InjectRepository(Attachment)
    private readonly attachmentRepository: Repository<Attachment>,
  ) {}

  async create(createAttachmentDto: CreateAttachmentDto): Promise<Attachment> {
    const attachment = this.attachmentRepository.create(createAttachmentDto);
    return await this.attachmentRepository.save(attachment);
  }

  async findAll(): Promise<Attachment[]> {
    return await this.attachmentRepository.find();
  }

  async findOne(id: number): Promise<Attachment> {
    const attachment = await this.attachmentRepository.findOne({
      where: { idAttachment: id },
    });

    if (!attachment) {
      throw new NotFoundException(`Attachment with ID ${id} not found`);
    }
    return attachment;
  }

  async update(
    id: number,
    updateAttachmentDto: UpdateAttachmentDto,
  ): Promise<Attachment> {
    const attachment = await this.findOne(id);

    const updated = Object.assign(attachment, updateAttachmentDto);
    return await this.attachmentRepository.save(updated);
  }

  async remove(id: number): Promise<{ message: string }> {
    const attachment = await this.findOne(id);
    await this.attachmentRepository.remove(attachment);

    return { message: `Attachment with ID ${id} has been deleted` };
  }
}
