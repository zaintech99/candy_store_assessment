import { Controller, Get, Post, Put, Param, Body, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { ICustomer, ICustomerListResponse } from './customer.interface';
import { CreateUpdateCustomerDto, GetAllCustomersDto } from './dto/customer.dto';
import { LocalAuthGuard } from '../auth/local.auth.guard';

@UseGuards(LocalAuthGuard)
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @Get()
  async getAllCustomers(@Query() getAllCustomersDto: GetAllCustomersDto): Promise<ICustomerListResponse> {
    return this.customerService.getAllCustomers(getAllCustomersDto);
  }

  @Get(':id')
  async getCustomerById(@Param('id') id: number): Promise<ICustomer> {
    return this.customerService.getCustomerById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createCustomer(@Body() createUpdateCustomerDto: CreateUpdateCustomerDto): Promise<ICustomer> {
    return this.customerService.createCustomer(createUpdateCustomerDto);
  }

  @Put(':id')
  async updateCustomer(@Param('id') id: number, @Body() createUpdateCustomerDto: CreateUpdateCustomerDto): Promise<ICustomer> {
    return this.customerService.updateCustomer(id, createUpdateCustomerDto);
  }
}
