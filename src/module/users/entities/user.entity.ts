import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Factory } from "nestjs-seeder";
import * as bcrypt from 'bcrypt';

export enum UserRole {
    ADMIN = 'admin',
    STUDENT = 'student',
    TEACHER = 'teacher',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Factory(faker => faker.name.firstName())
    @Column()
    first_name: string;

    @Factory(faker => faker.name.lastName())
    @Column()
    last_name: string;

    @Factory(faker => faker.internet.email())
    @Column({ unique: true })
    email: string;

    @Factory(faker => faker.internet.password())
    @Column()
    password: string;

    @Factory(faker => faker.helpers.arrayElement([UserRole.STUDENT, UserRole.TEACHER]))
    @Column({ type: "enum", enum: UserRole, 
        default: UserRole.STUDENT })
    role: UserRole;

    @Column({ default: true })
    is_active: boolean;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }

    @BeforeInsert() 
    @BeforeUpdate()
    async hashPassword() {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }        
}

