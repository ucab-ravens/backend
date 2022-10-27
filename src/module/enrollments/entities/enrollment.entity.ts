import { Course } from "src/module/courses/entities/course.entity";
import { User } from "src/module/users/entities/user.entity";
import {ManyToOne, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, 
   Index} from "typeorm";
import { Entity } from 'typeorm/decorator/entity/Entity';

@Entity('enrollments')
@Index(['user','course'],{unique: true})
export class Enrollment {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type=>User, user => user.enrollments)
  user: User;

  @ManyToOne(type=>Course, course => course.enrollments)
  course: Course;

  @CreateDateColumn({ type: "timestamp"})
  created_at: Date;

  @UpdateDateColumn({type: "timestamp"})
  updated_at: Date;
  

}
