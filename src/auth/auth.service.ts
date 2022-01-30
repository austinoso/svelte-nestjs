import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const passwordCompare = await bcrypt.compare(password, user.passwordHash);
    if (passwordCompare) {
      const { passwordHash, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: any): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(user.password, salt);
    const newUser = await this.usersService.create(user);
    console.log(newUser);
    return {
      access_token: this.jwtService.sign({
        username: newUser.username,
        sub: newUser.id
      }),
      user: newUser.username
    };
  }
}
