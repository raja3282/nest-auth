import { ESLint } from 'eslint';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { PasswordService } from 'src/password/password.service';
import { PrismaService } from 'src/prisma.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private passwordservice: PasswordService,
    private jwtService: JwtService,
  ) {}
  async login(data: LoginUserDto) {
    //validating email
    const result = await this.prisma.user.findFirst({
      where: { email: data.email },
    });
    //then validating password after hashing
    const hash = await this.passwordservice.comparePassword(
      data.password,
      result.password,
    );
    console.log('hash =', hash);
    //user logging in
    if (hash) {
      const obj = {
        user: result,
        message: 'user logged in successfully',
      };
      return this.signinUser(result.id, result.name, result.email, 'user');
    }
    //cant login / error
    else {
      throw new BadRequestException('email/password incorrect');
    }
  }
  async signinUser(
    userId: number,
    userName: string,
    email: string,
    userType: string,
  ) {
    const payload = {
      id: userId,
      username: userName,
      useremail: email,
      type: userType,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
