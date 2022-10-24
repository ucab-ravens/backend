import { Module } from '@nestjs/common';
import { UsersModule } from './module/users/users.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    // Database
    DatabaseModule,
    // Endpoint modules
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
