import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService)
  {}
  async create(newProduc: CreateProductDto) {
    try{
      await this.prisma.product.create({
        data: {
          name: newProduc.name,
          detail: newProduc.detail,
          p_purchase: newProduc.p_purchase,
          p_sale: newProduc.p_sale,
          provider: {
            connect: {
              id: newProduc.providerId
            }
          }
        }
      })
      return newProduc;
    }catch(e){
      throw new Error(e);
    }
  }

  async findAll() {
    try{
      const product = this.prisma.product.findMany({
        where:{
          isDeleted: false,
        },
        include: {
          provider: true
        }
      }) 
      if (!product){
          throw new Error ('product is empty')
      }
      return product;
    }catch(e){
      throw new Error(e);
  }
  }

  async findOne(id: string) {
    try{
      const product = await this.prisma.product.findUnique({
        where:{
          id,
        },
        include:{
          provider: true
        }
      });
      if(!product){
        throw new Error ('no se encontró provedor')
      }
      return product;
      }catch(e){
        throw new Error(e);
      }
  }

  async update(id: string, newProduc: UpdateProductDto) {
    try{
      const updateProv = await this.prisma.product.update({
        where:{
          id,
        },
        data: {
          name: newProduc.name,
          detail: newProduc.detail,
          p_purchase: newProduc.p_purchase,
          p_sale: newProduc.p_sale,
          provider: {
            connect: {
              id: newProduc.providerId
            }
          }
        }
      });
      return updateProv;
     }catch(e){
      throw new Error(e);
     }
  }

  async remove(id: string) {
    try{
      await this.prisma.product.update({
        where:{
          id,
        },
        data:{
          isDeleted: true,
        }
      })
      return {
        message: 'el producto se elimino correctamente'
      }
      }catch(e){
        throw new Error(e);
      }
  }
}
