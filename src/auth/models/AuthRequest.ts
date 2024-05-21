import { Request } from 'express';
import { Client } from 'src/client/entities/client.entity';

export class AuthRequest extends Request {
  user: Client;
}
