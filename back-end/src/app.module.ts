import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { PlayersModule } from './players/players.module';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{ ttl: 10, limit: 1 }]),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthModule,
    PlayersModule,
    TeamsModule,
  ],
  controllers: [],
})
export class AppModule {}
