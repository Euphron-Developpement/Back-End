import { 
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Prisma } from '@prisma/client';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get()
    async findAll() {
        return this.orderService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const order = await this.orderService.findOne(Number(id));
        if (!order) {
            throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
        }
        return order;
    }

    @Post()
    async create(@Body() data: Prisma.OrderCreateInput) {
        return this.orderService.create(data);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updatedData: Prisma.OrderUpdateInput) {
        return this.orderService.update(Number(id), updatedData);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const order = await this.orderService.delete(Number(id));
        if (!order) {
            throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
        }
        return order;
    }
}