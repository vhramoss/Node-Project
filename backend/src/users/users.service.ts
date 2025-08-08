import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { User } from './users.entity';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    user.password = await hash(user.password, 10);
    return this.usersRepository.save(user);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  // --- Método de atualização (PATCH) ---
  async update(id: number, user: Partial<User>): Promise<UpdateResult> {
    return this.usersRepository.update(id, user);
  }

  // --- Método de remoção (DELETE) ---
  async remove(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}