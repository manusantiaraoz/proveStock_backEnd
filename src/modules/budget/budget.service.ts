import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrinterService } from '../printer/printer.service';
import { budgetPrinter } from '../printer/documents';
import { Message } from 'node-mailjet';



@Injectable()
export class BudgetService {
  constructor (
    private readonly prisma:PrismaService,
    private readonly printerService: PrinterService
  ){}

  async recoverDataBudge(budgetId:string){
    const dataBudget = await this.prisma.budget.findUnique({
      where:{
        id: budgetId,
        isDeleted:false
      },
      select:{
        detail: true,
        totalAmount:true,
        createdAt:true,
        status:true,
        client:{
          select:{
            name: true,
            lastName: true,
            phone: true,
            address:true,
            dni:true,
            email:true
          }
        },
        user:{
          select:{
            name:true,
            email:true,
            dni:true,
            address:true,
            phone:true
          }
        },
        productLine:{
          select:{
            quantity:true,
            unit_price:true,
            total_price:true,
            product:{
              select:{
                name:true,
                detail:true
              }
            }
          }
        }
      }
    })
    

    return dataBudget

  }



  async create(budget: CreateBudgetDto, userId) {
    let totalAmount=0;
    for (const product of budget.productLine){
       const producto = await this.prisma.product.findFirst({
        where:{
          id: product.productId
        }
      }
      )
      let parcial= producto.p_sale*product.quantity;
      totalAmount= totalAmount + parcial
    }
    
   const newbudget= await this.prisma.$transaction(async (tx)=>{
      const presupuesto = await tx.budget.create({
        data:{
          userId,
          clientId: budget.clientId,
          detail: budget.detail,
          totalAmount: totalAmount
        }
      });
      for (const product of budget.productLine){
        const producto = await this.prisma.product.findFirst({
          where:{
            id: product.productId
          }
        }
        )
      
        await tx.productLine.create({
          data:{
            budgetId: presupuesto.id,
            productId: product.productId,
            quantity: product.quantity,
            unit_price: producto.p_sale,
            total_price: producto.p_sale * product.quantity
          }
        })
      }
      return presupuesto
    })
     const datita = this.recoverDataBudge(newbudget.id);
    return datita
  }

  async findAll(userId) {
    try{

      const dataBudget = await this.prisma.budget.findMany({
        where:{
          userId,
          isDeleted:false
        },
        select:{
          id:true,
          detail: true,
          totalAmount:true,
          status:true,
          client:{
            select:{
              name: true,
              lastName: true,
              phone: true,
              address:true,
              dni:true,
              email:true
            }
          },
          user:{
            select:{
              name:true,
              email:true,
              dni:true,
              address:true,
              phone:true
            }
          },
          productLine:{
            select:{
              quantity:true,
              unit_price:true,
              total_price:true,
              product:{
                select:{
                  name:true,
                  detail:true
                }
              }
            }
          }
        }
      })
      return {dataBudget}
    }catch(e){
      throw new BadRequestException(e.message);
    }
    }

  findOne(id: string) {
    return this.recoverDataBudge(id);
  }

  async remove(id: string) {
    try{
      await this.prisma.budget.update({
        where:{
          id,
        },
        data:{
          isDeleted: true,
          productLine:{
            updateMany:{
              where:{budgetId : id},
              data: {isDeleted: true}
            }
          }
        }
      })
      return {message: 'presupuesto eliminado'}
    }catch(e){
      throw new BadRequestException(e.message);
    }
  }

  async confirmBudget(id:string){
    try{
      const budget = await this.prisma.budget.findUnique({
        where:{id, status:"PENDING"},
        include:{user:true,productLine:{include:{product:true}}}
      })
      if(!budget){
        throw new Error("no pudimos encontrar presupuesto pendiente")
      }
      await this.prisma.$transaction(async(tx)=>{
        const productLine = budget.productLine
        for(const prod of productLine){
          const stockProduct = prod.product.stock
          if(stockProduct == 0 || stockProduct<prod.quantity){
            throw new Error (`${prod.product.name} sin stock disponible`)
          }

          await tx.product.update({
            where: {id: prod.product.id},
            data:{stock:{decrement:prod.quantity}}
          })
        }
        await tx.budget.update({
          where:{id: budget.id},
          data:{status:"CONFIRM"}
        })
      })
      return {Message:"presupuesto confirmado"}
    }catch(e){
      throw new BadRequestException(e.message);
    }
  }

  async printBudget (id: string):Promise<Buffer>{
    try{
      const presupuesto = await this.recoverDataBudge(id);
      const pdfFormat = await budgetPrinter(presupuesto)
      const pdfDetail = await this.printerService.createPdf(pdfFormat) 
      return pdfDetail

    }catch(e){
      throw new BadRequestException(e.message);
    }

  }
}
