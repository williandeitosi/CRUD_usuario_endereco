import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    const data = {
      ...createClientDto,
      password: await bcrypt.hash(createClientDto.password, 10),
    };

    const createdClient = await this.prisma.client.create({ data });

    return {
      ...createdClient,
      password: undefined,
    };
  }

  findByEmail(email: string) {
    return this.prisma.client.findUnique({
      where: { email },
    });
  }
}
