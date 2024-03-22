import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUserDto = { ...createUserDto, password: hashedPassword };
    await this.usersService.create(newUserDto);
    return { message: "User successfully registered." };
  }
  
  async login(loginDto: LoginDTO): Promise<{ message: string, token: string }> {
    const user = await this.usersService.findOne(loginDto.identifier);

    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
        throw new UnauthorizedException('Login failed');
    }

    const payload = { username: user.username };
    const token = await this.jwtService.signAsync(payload);
    return {
      message: 'Login successful',
      token: token,
    };
  }
}