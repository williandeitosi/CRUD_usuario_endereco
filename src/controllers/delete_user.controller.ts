import { Controller, Delete, NotFoundException, Param } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('user')
export class DeleteUserController {
  constructor(private prisma: PrismaService) {}

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const findId = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!findId) {
      throw new NotFoundException('ID is not exists!');
    }
    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });

    return { msg: 'User successfully deleted' };
  }
}
