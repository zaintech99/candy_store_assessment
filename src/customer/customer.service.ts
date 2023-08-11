import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { ICustomer, ICustomerListResponse } from './customer.interface';
import { CreateUpdateCustomerDto, GetAllCustomersDto } from './dto/customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) { }

  async getAllCustomers(getAllCustomersDto: GetAllCustomersDto): Promise<ICustomerListResponse> {
    const { page = 1, limit = 10 } = getAllCustomersDto;
    const [results, total] = await this.customerRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      page,
      limit,
      total,
      pages: limit > 0 ? Math.ceil(total / limit) || 1 : null,
      results,
    };
  }

  async getCustomerById(id: number): Promise<ICustomer> {
    const customer = await this.customerRepository.findOne({
      where: { customer_id: id },
    });
    if (!customer) throw new NotFoundException("customer does not exist!");
    return customer;
  }

  async createCustomer(createCustomerDto: CreateUpdateCustomerDto): Promise<ICustomer> {
    return this.customerRepository.save(createCustomerDto);
  }

  async updateCustomer(id: number, createUpdateCustomerDto: CreateUpdateCustomerDto): Promise<ICustomer> {
    await this.customerRepository.update(id, createUpdateCustomerDto);
    return this.getCustomerById(id)
  }
}
