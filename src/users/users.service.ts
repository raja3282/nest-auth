import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PasswordService } from 'src/password/password.service';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private passwordservice: PasswordService,
  ) {}
  //signup user
  async create(createUserDto: CreateUserDto) {
    //hashing new user password
    const pass = await this.passwordservice.hashPassword(
      createUserDto.password,
    );
    //create new user account with hashed password
    //hashed password in pass
    createUserDto.password = pass;
    const result = await this.prisma.user.create({
      data: createUserDto,
    });
    return result;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findOneByEmail(email: string) {
    const result = this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    return result;
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
