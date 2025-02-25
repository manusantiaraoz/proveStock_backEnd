import { Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { PrismaService } from '../prisma/prisma.service';



@Injectable()
export class BudgetService {
  constructor (private readonly prisma:PrismaService){}

  async recoverDataBudge(budgetId:string){
    const dataBudget = await this.prisma.budget.findUnique({
      where:{
        id: budgetId,
        isDeleted:false
      },
      select:{
        detail: true,
        totalAmount:true,
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



  async create(budget: CreateBudgetDto) {
    const newbudget = await this.prisma.$transaction(async (tx)=>{
      const presupuesto = await tx.budget.create({
        data:{
          userId: budget.userId,
          clientId: budget.clientId,
          detail: budget.detail,
          totalAmount: budget.totalAmount
        }
      });
      for (const product of budget.productLine){
        await tx.productLine.create({
          data:{
            budgetId: presupuesto.id,
            productId: product.productId,
            quantity: product.quantity,
            unit_price: product.unit_price,
            total_price: product.total_price
          }
        })
      }
      return presupuesto
    })
     const datita = this.recoverDataBudge(newbudget.id);
    return datita
  }

  async findAll() {
    try{

      const dataBudget = await this.prisma.budget.findMany({
        where:{
          
          isDeleted:false
        },
        select:{
          detail: true,
          totalAmount:true,
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
      throw new Error(e);
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
      throw new Error(e);
    }
  }
}
