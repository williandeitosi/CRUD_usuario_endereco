import { PrismaService } from 'src/prisma/prisma.service';
import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

@Controller('user')
export class FindUserController {
  constructor(private prisma: PrismaService) {}

  @Get(':id')
  async findId(@Param('id') id: string) {
    const findUser = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!findUser) {
      throw new NotFoundException('ID is not exists!');
    }

    return findUser;
  }
}
