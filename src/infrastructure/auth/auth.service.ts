import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export class AuthService {
  private static secret = process.env.JWT_SECRET ?? 'secret';
  private static timeToExpire = process.env.JWT_EXPIRE ?? '1d';

  public static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  public static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  public static async createToken(payload: { email: string; id: string }) {
    return jwt.sign(payload, this.secret, { expiresIn: this.timeToExpire });
  }
}
