import { Body, Controller, Param, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface AddressCreateInput {
  ZIPCode: string;
  Address: string;
  Number: number;
  Neighborhood: string;
  State: string;
  City: string;
}

@Controller('user')
export class CreateAddressController {
  constructor(private prisma: PrismaService) {}

  @Post(':id/address')
  async handle(@Body() body: any, @Param('id') id: string) {
    const { ZIPCode, Address, Number, Neighborhood, State, City } = body;

    const data: AddressCreateInput = {
      ZIPCode: ZIPCode,
      Address: Address,
      Number: Number,
      Neighborhood: Neighborhood,
      State: State,
      City: City,
    };

    try {
      const addressCreated = await this.prisma.address.create({
        data: {
          ZIPCode: data.ZIPCode,
          Address: data.Address,
          Number: data.Number,
          Neighborhood: data.Neighborhood,
          State: data.State,
          City: data.City,
          address: { connect: { id: id } },
        },
      });
      return addressCreated;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao criar endereço');
    }
  }
}
