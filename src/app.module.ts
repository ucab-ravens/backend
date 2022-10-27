import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './module/users/users.module';
import { CategoriesModule } from './module/categories/categories.module';
import { CoursesModule } from './module/courses/courses.module';
import { LessonsModule } from './module/lessons/lessons.module';
import { EnrollmentsModule } from './module/enrollments/enrollments.module';
import { LessonsCommentsModule } from './module/lessons-comments/lessons-comments.module';

@Module({
  imports: [
    // Database
    DatabaseModule,
    // Auth
    AuthModule,
    // Endpoints
    UsersModule,
    CategoriesModule,
    CoursesModule,
    LessonsModule,
    EnrollmentsModule,
    LessonsCommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
