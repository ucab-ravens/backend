import { Module } from '@nestjs/common';
import { UsersModule } from './module/users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './module/categories/categories.module';
import { CoursesModule } from './module/courses/courses.module';

@Module({
  imports: [
    // Database
    DatabaseModule,
    // Endpoint modules
    UsersModule,
    AuthModule,
    CategoriesModule,
    CoursesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
