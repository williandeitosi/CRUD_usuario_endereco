import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('users')
export class CreateUserController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: any) {
    const { name, email, phoneNumber, Address } = body;

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (userWithSameEmail) {
      throw new ConflictException(`email: ${email} already exists`);
    }
    const userCreated = await this.prisma.user.create({
      data: {
        name,
        email,
        phoneNumber,
        Address: {
          create: Address,
        },
      },
    });
    return userCreated;
  }
}
