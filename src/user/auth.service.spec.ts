import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './user.service';
import { IUsersRepository } from './interfaces/IUserRepository';

describe('AuthService', () => {
  let service: UsersService;
  let mockUsersRepository: Partial<IUsersRepository>;

  beforeEach(async () => {
    mockUsersRepository = {
      findByEmail: jest.fn(),
      createUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        JwtService,
        { provide: 'IUsersRepository', useValue: mockUsersRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('signUp', () => {
    it('should create a new user with hashed password', async () => {
      const hashSpy = jest
        .spyOn(bcrypt, 'hash')
        .mockResolvedValue('hashedPassword');
      mockUsersRepository.findByEmail = jest.fn().mockResolvedValue(null);
      mockUsersRepository.createUser = jest.fn().mockResolvedValue({ id: 1 });

      const result = await service.signUp(
        'username',
        'test@example.com',
        'password',
      );

      expect(hashSpy).toHaveBeenCalledWith('password', 10);
      expect(mockUsersRepository.createUser).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'hashedPassword',
        username: 'username',
      });
      expect(result).toEqual({ id: 1 });
    });

    it('should throw ConflictException if email is already in use', async () => {
      mockUsersRepository.findByEmail = jest.fn().mockResolvedValue({ id: 1 });

      await expect(
        service.signUp('username', 'test@example.com', 'password'),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('login', () => {
    it('should return JWT access token on successful login', async () => {
      const user = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
      };
      mockUsersRepository.findByEmail = jest.fn().mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      const signSpy = jest
        .spyOn(service['jwtService'], 'sign')
        .mockReturnValue('accessToken');

      const result = await service.login('test@example.com', 'password');

      expect(signSpy).toHaveBeenCalledWith({ id: user.id, email: user.email });
      expect(result).toEqual({ accessToken: 'accessToken' });
    });

    it('should throw UnauthorizedException on invalid credentials', async () => {
      mockUsersRepository.findByEmail = jest.fn().mockResolvedValue(null);

      await expect(
        service.login('test@example.com', 'wrongpassword'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
