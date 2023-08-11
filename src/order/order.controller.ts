import { Controller, Get, Post, Put, Param, Body, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { OrderService } from './order.service';
import { IOrder, IOrderListResponse } from './order.interface';
import { CreateOrderDto, GetAllOrdersDto, UpdateOrderDto } from './dto/order.dto';
import { LocalAuthGuard } from '../auth/local.auth.guard';

@UseGuards(LocalAuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Get()
  async getAllOrders(@Query() getAllOrdersDto: GetAllOrdersDto): Promise<IOrderListResponse> {
    return this.orderService.getAllOrders(getAllOrdersDto);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: number): Promise<IOrder> {
    return this.orderService.getOrderById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<IOrder> {
    return this.orderService.createOrder(createOrderDto);
  }

  @Put(':id')
  async updateOrder(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto): Promise<IOrder> {
    return this.orderService.updateOrder(id, updateOrderDto);
  }

  @Get('generateMonthlyReport/test')
  async generateMonthlyReport() {
    return this.orderService.generateMonthlyReport();
  }
}
