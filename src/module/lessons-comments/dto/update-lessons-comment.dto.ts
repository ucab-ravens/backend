import { PartialType } from '@nestjs/swagger';
import { CreateLessonsCommentDto } from './create-lessons-comment.dto';

export class UpdateLessonsCommentDto extends PartialType(CreateLessonsCommentDto) {}
