import { Injectable } from '@nestjs/common';
import { CreatePasswordDto } from './dto/create-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
const saltOrRounds = 10;
@Injectable()
export class PasswordService {
  async hashPassword(password: string) {
    return await bcrypt.hash(password, saltOrRounds);
  }
  async comparePassword(password: string, hash: string) {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  }

  create(createPasswordDto: CreatePasswordDto) {
    return 'This action adds a new password';
  }

  findAll() {
    return `This action returns all password`;
  }

  findOne(id: number) {
    return `This action returns a #${id} password`;
  }

  update(id: number, updatePasswordDto: UpdatePasswordDto) {
    return `This action updates a #${id} password`;
  }

  remove(id: number) {
    return `This action removes a #${id} password`;
  }
}
