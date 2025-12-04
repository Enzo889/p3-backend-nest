import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from 'src/entities/entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create(createCustomerDto);
    return await this.customerRepository.save(customer);
  }

  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { idCustomer: id },
    });

    if (!customer) {
      throw new NotFoundException(`Customer con ID ${id} no existe`);
    }

    return customer;
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const customer = await this.findOne(id);

    const updated = Object.assign(customer, updateCustomerDto);
    return await this.customerRepository.save(updated);
  }

  async remove(id: number): Promise<{ message: string }> {
    const customer = await this.findOne(id);
    await this.customerRepository.delete(customer.idCustomer);

    return { message: `Customer con ID ${id} eliminado correctamente` };
  }
}
