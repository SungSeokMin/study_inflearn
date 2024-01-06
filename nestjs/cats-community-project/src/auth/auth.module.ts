import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { CatsModule } from 'src/cats/cats.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),

    PassportModule.register({ defaultStrategy: 'jwt', session: false }),

    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1y' },
    }),

    forwardRef(() => CatsModule),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
