import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, User } from '@prisma/client'; // Import Prisma types, including User

@Injectable()
export class UsersService {
  
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.prisma.user.create({
        data: createUserDto,
      });
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') { // This is the code for a unique constraint violation
          throw new ConflictException('A user with this email already exists');
        }
      }
      throw new InternalServerErrorException(); // Fallback for other errors
    }
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(identifier: string): Promise<User> { // Updated return type to not include | null because we throw an error if not found
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { username: identifier },
          { email: identifier },
        ],
      },
    });

    if (!user) {
      throw new NotFoundException(`No user found with username/email ${identifier}`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        // Prisma's specific error when update/delete target does not exist
        throw new NotFoundException(`No user found with ID ${id}`);
      }
      throw error; // Rethrow any other errors
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        // Prisma's specific error when update/delete target does not exist
        throw new NotFoundException(`No user found with ID ${id}`);
      }
      throw error; // Rethrow any other errors
    }
  }
}
