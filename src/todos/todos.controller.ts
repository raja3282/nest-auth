import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/constants';

@ApiBearerAuth()
@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}
  @Post('newtodo')
  async create(@Request() req, @Body() createTodoDto: CreateTodoDto) {
    const today = new Date().toISOString();
    console.log('today date:', today.toString);
    console.log('input date', createTodoDto.todo_date.toString());

    const newDate = createTodoDto.todo_date.toString();
    if (newDate < today) {
      console.log('éntered if');

      throw new BadRequestException('Invalid Date');
    } else {
      return await this.todosService.create(createTodoDto, req.user.id);
    }
  }
  @Get('profile')
  getProfile(@Request() req) {
    console.log('new data', req.user);

    return req.user;
  }

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
