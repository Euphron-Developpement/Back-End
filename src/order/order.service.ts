import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order, Prisma } from '@prisma/client';

@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) {}
    
    async findAll(): Promise<Order[]> {
        return this.prisma.order.findMany();
    }
    
    async findOne(id: number): Promise<Order | null> {
        return this.prisma.order.findUnique({
        where: { id },
        });
    }
    
    async create(data: Prisma.OrderCreateInput): Promise<Order> {
        return this.prisma.order.create({
        data,
        });
    }
    
    async update(id: number, data: Prisma.OrderUpdateInput): Promise<Order> {
        return this.prisma.order.update({
        where: { id },
        data,
        });
    }
    
    async delete(id: number): Promise<Order | null> {
        try {
        return await this.prisma.order.delete({
            where: { id },
        });
        } catch (error) {
        return null;
        }
    }
}