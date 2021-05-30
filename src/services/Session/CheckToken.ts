import { verify } from 'jsonwebtoken';

import AppError from '../../errors/AppError';
import authConfig from '../../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

interface Request {
  id: string;
  token: string;
}

class CheckToken{
  public async execute({ id, token }: Request): Promise<Boolean> {

    if (!token) {
      throw new AppError('JWT token is missing', 401);
    }

    if (!id) {
      throw new AppError('Id is missing', 401);
    }

    try {
      const decoded = verify(token, authConfig.jwt.secret);

      const { sub } = decoded as TokenPayload;

      return (sub == id);

    } catch {
      throw new AppError('Invalid JWT token', 401);
    }

    return true;
  }


}

export default CheckToken;
