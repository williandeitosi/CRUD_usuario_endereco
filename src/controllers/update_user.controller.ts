import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('user/update')
export class UpdateUserController {
  constructor(private prisma: PrismaService) {}

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() body: any) {
    const { name, email, phoneNumber } = body;

    const findId = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!findId) {
      throw new NotFoundException('ID is not exists!');
    }
    const update = await this.prisma.user.update({
      where: { id: id },
      data: {
        name,
        email,
        phoneNumber,
      },
    });

    return update;
  }
}
