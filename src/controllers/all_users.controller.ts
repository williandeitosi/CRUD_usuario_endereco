import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('users/all')
export class ListUsersController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async list() {
    const users = await this.prisma.user.findMany();
    return users;
  }
}
