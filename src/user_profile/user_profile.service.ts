import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from './entities/user_profile.entity';
import { CreateUserProfileDto } from './dto/create-user_profile.dto';
import { UpdateUserProfileDto } from './dto/update-user_profile.dto';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly userProfileRepo: Repository<UserProfile>,
  ) {}

  async create(createUserProfileDto: CreateUserProfileDto) {
    const newProfile = this.userProfileRepo.create(createUserProfileDto);
    return await this.userProfileRepo.save(newProfile);
  }

  async findAll() {
    return await this.userProfileRepo.find();
  }

  async findOne(id: number) {
    const profile = await this.userProfileRepo.findOne({
      where: { idProfile: id },
    });

    if (!profile) {
      throw new NotFoundException(`UserProfile with ID ${id} not found`);
    }

    return profile;
  }

  async update(id: number, updateUserProfileDto: UpdateUserProfileDto) {
    const profile = await this.findOne(id);

    const updated = Object.assign(profile, updateUserProfileDto);
    return await this.userProfileRepo.save(updated);
  }

  async remove(id: number) {
    const profile = await this.findOne(id);
    await this.userProfileRepo.remove(profile);

    return { message: `UserProfile with ID ${id} removed successfully` };
  }
}
