import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/DTOs/CreateUserDto';

@Controller('users')
@ApiTags('users') // Group users-related endpoints in Swagger
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' }) // Describe the operation
  @ApiResponse({ status: 201, description: 'User successfully created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto.username, createUserDto.password);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserById(@Param('id') id: number) {
    return this.userService.findById(id);
  }
}
