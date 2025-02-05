import { Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProviderService {
  constructor(
    private readonly prisma: PrismaService
  ){}
  
  async create(newProv: CreateProviderDto) {
    try{
      const findClient = await this.prisma.provider.findUnique({
        where:{
          dni: newProv.dni,
        }
      })

      if(findClient){
        throw new Error('cliente ya registrado')
      }
      
      await this.prisma.provider.create({
        data: newProv,
      })
      return newProv

    }catch(e){
      throw new Error(e);
    }
  }

  findAll() {
    try{
      const provider = this.prisma.provider.findMany({
        where:{
          isDeleted: false,
        }
      }) 
      if (!provider){
          throw new Error ('provider is empty')
      }
      return provider;
    }catch(e){
      throw new Error(e);
  }
}

   async findOne(id: string) {
    try{
      const prov = await this.prisma.provider.findUnique({
        where:{
          id,
        }
      });
      if(!prov){
        throw new Error ('no se encontró provedor')
      }
      return prov;
      }catch(e){
        throw new Error(e);
      }
  }

   async update(id: string, updateProviderDto: UpdateProviderDto) {
    try{
      const updateProv = await this.prisma.provider.update({
        where:{
          id,
        },
        data:updateProviderDto,
      });
      return updateProv;
     }catch(e){
      throw new Error(e);
     }
  }

   async remove(id: string) {
    try{
      await this.prisma.provider.update({
        where:{
          id,
        },
        data:{
          isDeleted: true,
        }
      })
      return {
        message: 'el proveedor se elimino correctamente'
      }
      }catch(e){
        throw new Error(e);
      }
  }
}
