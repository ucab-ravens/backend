import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './module/users/users.module';
import { CategoriesModule } from './module/categories/categories.module';
import { CoursesModule } from './module/courses/courses.module';
import { LessonsModule } from './module/lessons/lessons.module';
import { EnrollmentsModule } from './module/enrollments/enrollments.module';
import { LessonsCommentsModule } from './module/lessons-comments/lessons-comments.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { LogsMiddleware } from './log/logs.middleware';
import { MailerModule } from '@nestjs-modules/mailer';

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
    // Logs
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
      ],      
    }),
    // Mail Service
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
    }

    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogsMiddleware)
      .forRoutes('*');
  }
}
