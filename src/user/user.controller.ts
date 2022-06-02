import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, ParseIntPipe, BadRequestException, Put, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,private authService: AuthService) {}


  @Post()
  @UsePipes(new ValidationPipe)
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
  
  @UseGuards(JwtAuthGuard)
  @Get("/:id")
  findOne(@Param('id')id:number){
    return this.userService.findOne(id)
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  
}
