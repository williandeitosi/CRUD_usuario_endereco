import { Controller, Delete, NotFoundException, Param } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('user/:id/address')
export class DeleteAddressController {
  constructor(private prisma: PrismaService) {}

  @Delete(':addressId')
  async deleteUser(
    @Param('id') id: string,
    @Param('addressId') addressId: string,
  ) {
    const findUser = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: { Address: true },
    });

    if (!findUser) {
      throw new NotFoundException('User ID is not exists!');
    }

    const findAddress = findUser.Address.find((a) => a.id === addressId);

    if (!findAddress) {
      throw new NotFoundException('Address ID is not exists!');
    }

    await this.prisma.address.delete({
      where: { id: addressId },
    });

    return { msg: 'Address successfully deleted' };
  }
}
