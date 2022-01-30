import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(useranme: string): Promise<User> {
    return this.usersRepository.findOne({ username: useranme });
  }

  async create(user: { username: string, password: string }): Promise<User> {

    const newUser = this.usersRepository.create(user);

    try {
      await this.usersRepository.save(newUser);
    } catch (error) {
      console.log(error);
    }

    return newUser;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}