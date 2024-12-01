import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async resetIssuesFlag(): Promise<number> {
    // Считаем количество пользователей с hasIssues = true
    const count = await this.userRepository.count({ where: { hasIssues: true } });

    // Сбрасываем флаг hasIssues для всех пользователей
    await this.userRepository.update({}, { hasIssues: false });

    return count;
  }
}
