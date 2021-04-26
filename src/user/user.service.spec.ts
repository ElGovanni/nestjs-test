import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import User from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(getRepositoryToken(User));
  });

  describe('find user', () => {
    it('should find user correctly', async function () {
      const email = 'test@email.domain';
      const user = {
        email: email,
        name: 'test',
        password: '123456',
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue(user as User);
      const userResult = await service.getByEmail(email);

      expect(userResult).toBe(user);
      expect(repository.findOne).toBeCalledWith({ email });
    });
  });

  describe('create user', () => {
    it('should create user', async function () {
      const email = 'test@email.domain';
      const user = {
        email: email,
        name: 'test',
        password: '123456',
      };
      jest.spyOn(repository, 'save');
      jest.spyOn(repository, 'create');
      await service.create(user);

      expect(repository.save).toBeCalledTimes(1);
    });
  });
});
