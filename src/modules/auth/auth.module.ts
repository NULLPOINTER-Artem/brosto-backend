import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWTStrategy } from 'src/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    ConfigModule.forFeature(() => ({})),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES_AFTER_SECONDS'),
        },
      }),
    }),
  ],
  providers: [AuthService, JWTStrategy],
  controllers: [AuthController],
  exports: [JWTStrategy, PassportModule],
})
export class AuthModule {}
