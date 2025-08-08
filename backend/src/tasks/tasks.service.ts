import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from 'src/users/users.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = this.tasksRepository.create({ ...createTaskDto, user });
    return this.tasksRepository.save(task);
  }

  async findAll(user: User): Promise<Task[]> {
    console.log('Usuário recebido no findAll:', user);
    return this.tasksRepository.find({
      where: { user: { id: user.id } },
    });
  }

  async findOne(id: number, user: User): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    }

    return task;
  }

  async update(id: number, updateTaskDto: Partial<Task>, user: User): Promise<Task> {
    let task = await this.tasksRepository.findOne({ where: { id, user: { id: user.id } } });

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    }

    task = this.tasksRepository.merge(task, updateTaskDto);
    return this.tasksRepository.save(task);
  }

  async remove(id: number, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, userId: user.id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    }
  }
}