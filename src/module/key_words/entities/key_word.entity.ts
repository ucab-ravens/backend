import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Factory } from "nestjs-seeder";

@Entity('key_words')
export class Key_Word {
    @PrimaryGeneratedColumn()
    id: number;

    @Factory(faker => faker.random.word())
    @Column()
    key_word: string;
}
