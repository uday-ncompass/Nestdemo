import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository:Repository<User>
  ){}


  async create(createUserDto: CreateUserDto){
    let userExists =await this.userRepository.findOne({where:{email:createUserDto.email}})
    if(userExists){
      throw new BadRequestException("User Already exist")
    }
    let hashedpass =await bcrypt.hash(createUserDto.password,10)
    createUserDto.password = hashedpass
    let user1 = this.userRepository.create(createUserDto);
    this.userRepository.save(user1);
    return user1
}

  async findAll() {
    let users = await this.userRepository.find();
    if(users === null){
      throw new NotFoundException("user not found")
    }
    return users
  }

  async findOne(id:number){
    let user =await this.userRepository.findOne({
      where :{
        id:id
      }
    })

    // console.log(user)

    if(user === null){
      throw new NotFoundException("user not found")
    }

    return user

  }
 
  async update(id: number, updateUserDto: UpdateUserDto) {
    let user =await this.userRepository.findOne({
      where :{
        id:id
      }
    })
    if(user === null){
      throw new NotFoundException("user not found")
    }
    if( !bcrypt.compareSync(updateUserDto.password,user.password)){
      throw new ForbiddenException("Password does not match")
    }
    let hasPass =await bcrypt.hash(updateUserDto.password,10)
    updateUserDto.password = hasPass 
    let updateuser =await this.userRepository.update( id , updateUserDto);
    return this.userRepository.findOne({where : {id}});
}

  async remove(id: number) {
    let user =await this.userRepository.findOne({
      where :{
        id:id
      }
    })
    if(user === null){
      throw new NotFoundException("user not found")
    }
    let data = await this.userRepository.delete(id)
    if(data.affected){
      return user
    }
  }
  async login(email:string) {
    return this.userRepository.findOne({where:{email:email}});
  }
}
