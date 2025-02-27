import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { AuthJwtPayload } from '../types/auth-jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // how to extract the token from the request. Here we are extracting it from the authorization header
      secretOrKey: configService.get<string>('JWT_SECRET') || 'defaultSecret', // the secret key that was used to sign the token
      ignoreExpiration: false, // if true, it will not check the expiration date of the token
    });
  }

  validate(payload: AuthJwtPayload) {
    const { userId } = payload.sub;
    const jwtUser = this.authService.validateJwtUser(userId);
    return jwtUser;
  }
}
