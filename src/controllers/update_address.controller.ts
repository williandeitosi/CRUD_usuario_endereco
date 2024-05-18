import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface AddressCreateInput {
  ZIPCode: string;
  Address: string;
  Number: number;
  Neighborhood: string;
  State: string;
  City: string;
}

@Controller('user/:id/address')
export class UpdateAddressController {
  constructor(private prisma: PrismaService) {}

  @Put(':addressId')
  async handle(
    @Body() body: any,
    @Param('id') id: string,
    @Param('addressId') addressId: string,
  ) {
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
      const findUser = await this.prisma.user.findUnique({
        where: { id: id },
        include: { Address: true },
      });

      if (!findUser) {
        throw new NotFoundException('User ID is not exists!');
      }

      const findAddress = findUser.Address.find((a) => a.id === addressId);

      if (!findAddress) {
        throw new NotFoundException('Address ID is not exists!');
      }

      const addressUpdate = await this.prisma.address.update({
        where: { id: addressId },
        data: {
          ZIPCode: data.ZIPCode,
          Address: data.Address,
          Number: data.Number,
          Neighborhood: data.Neighborhood,
          State: data.State,
          City: data.City,
        },
      });

      return addressUpdate;
    } catch (error) {
      // console.error(error);
      throw new NotFoundException('Address ID is not exists!');
    }
  }
}
