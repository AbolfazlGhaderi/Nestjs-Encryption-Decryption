import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),TypeOrmModule.forRoot({
    type: 'postgres',
    port: +process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST ,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
    synchronize:true
    
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
