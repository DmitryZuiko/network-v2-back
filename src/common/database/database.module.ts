import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvVariables } from '../enums/envVariables.enum';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ ConfigModule ],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>(EnvVariables.DATABASE_URL),
        autoLoadEntities: true,
        synchronize: true, // только для разработки
      }),
      inject: [ ConfigService ],
    }),
  ],
})
export class DatabaseModule {}
