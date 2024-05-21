import { Injectable } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly clientService: ClientService) {}

  async validateClient(email: string, password: string) {
    const client = await this.clientService.findByEmail(email);

    if (client) {
      const isPasswordValid = await bcrypt.compare(password, client.password);

      if (isPasswordValid) {
        return {
          ...client,
          password: undefined,
        };
      }
    }

    throw new Error('Email address or password provided is incorrect');
  }
}
