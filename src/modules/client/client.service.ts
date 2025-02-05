import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClientService {
  constructor(
    private readonly prisma:PrismaService
  ){}

  async create(newClient: CreateClientDto) {
    try{
      const findClient = await this.prisma.client.findUnique({
        where:{
          dni: newClient.dni,
        }
      })

      if(findClient){
        throw new Error('cliente ya registrado')
      }
      
      await this.prisma.client.create({
        data: newClient,
      })
      return newClient

    }catch(e){
      throw new Error(e);
    }
  }

  async findAll() {
    try{
      const client = await this.prisma.client.findMany({
        where:{
          isDeleted: false,
        }
      }) 
      if (!client){
          throw new Error ('users is empty')
      }
      return client;
    }catch(e){
      throw new Error(e);
    }
  }

  async findOne(id: string) {
    try{
      const client = await this.prisma.client.findUnique({
        where:{
          id,
        }
      });
      if(!client){
        throw new Error ('no se encontró cliente')
      }
      return client;
      }catch(e){
        throw new Error(e);
      }
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    try{
      const updateClient = await this.prisma.client.update({
        where:{
          id,
        },
        data:updateClientDto,
      });
      return updateClient;
     }catch(e){
      throw new Error(e);
     }
  }

  async remove(id: string) {
    try{
      await this.prisma.client.update({
        where:{
          id,
        },
        data:{
          isDeleted: true,
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
