import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateUserController } from './controllers/create_user.controller';
import { ListUsersController } from './controllers/all_users.controller';
import { FindUserController } from './controllers/find_user_id.controller';
import { DeleteUserController } from './controllers/delete_user.controller';
import { UpdateUserController } from './controllers/update_user.controller';
import { CreateAddressController } from './controllers/create_address.controller';
import { UpdateAddressController } from './controllers/update_address.controller';
import { DeleteAddressController } from './controllers/delete_address.controller';
import { ClientModule } from './client/client.module';

@Module({
  imports: [ClientModule],
  controllers: [
    CreateUserController,
    ListUsersController,
    FindUserController,
    DeleteUserController,
    UpdateUserController,
    CreateAddressController,
    UpdateAddressController,
    DeleteAddressController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
