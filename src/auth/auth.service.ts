import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ClientService } from 'src/client/client.service';
import { Client } from 'src/client/entities/client.entity';
import { ClientPayload } from './models/ClientPayload';
import { UserTokken } from './models/UserTokken';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientService: ClientService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: Client): UserTokken {
    const payload: ClientPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }

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
