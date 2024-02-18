import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { userDto } from './dto/user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  getall(){
    return this.usersService.getAll();
  }

  @Post('')
  create(@Body() userData:userDto){
    return this.usersService.createUser(userData)
  }

  @Get('g')
  getUser(){
    return this.usersService.getUser()
  }

  //----------------------- symmetric ---------------------------------


  @Post('symmetric')
  createUserSymmetric(@Body() data: userDto) {

    return this.usersService.createUserSymmetric(data)
  }
}
