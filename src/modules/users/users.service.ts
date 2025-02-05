import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { hashPassword } from 'src/utils/encryption';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService
  ){}



  async create(newUser: CreateUserDto) {
  try{
  
    const findUser = await this.prisma.user.findUnique({
      where: {
        email: newUser.email,
      },
    });
  
  if(findUser){
    throw new Error ('email ya registrado, intente con otro')
  }

await this.prisma.user.create({
data: {
...newUser,
password: await  hashPassword(newUser.password)
}
  })
    return newUser

  }catch(e){
    throw new Error(e);
  }
  }


  async findAll() {
    try{
      const users = await this.prisma.user.findMany({
        where:{
          isDeleted: false,
        }
      }) 
      if (!users){
          throw new Error ('users is empty')
      }
      return users;
    }catch(e){
      throw new Error(e);
    }
  }

  async findOne(id: string) {
    try{
    const user = await this.prisma.user.findUnique({
      where:{
        id,
      }
    });
    return user;
    }catch(e){
      throw new Error(e);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
   try{
    const updateUser = await this.prisma.user.update({
      where:{
        id,
      },
      data:updateUserDto,
    });
    return updateUser;
   }catch(e){
    throw new Error(e);
   }
  }

  async remove(id: string) {
    try{
    await this.prisma.user.update({
      where:{
        id,
      },
      data:{
        isDeleted: true,
        isActive: false
      }
    })
    return {
      message: 'el usuario se elimino correctamente'
    }
    }catch(e){
      throw new Error(e);
    }
  }
}
