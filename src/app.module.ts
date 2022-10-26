import { Module } from '@nestjs/common';
import { UsersModule } from './module/users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './module/categories/categories.module';
import { CoursesModule } from './module/courses/courses.module';
import { LessonsModule } from './module/lessons/lessons.module';
import { EnrollmentsModule } from './module/enrollments/enrollments.module';

@Module({
  imports: [
    // Database
    DatabaseModule,
    // Endpoint modules
    UsersModule,
    AuthModule,
    CategoriesModule,
    CoursesModule,
    //LessonsModule,//////////////////////////////////////////////////////
    EnrollmentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
