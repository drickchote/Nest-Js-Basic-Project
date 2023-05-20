import { Injectable, NotFoundException } from '@nestjs/common';
import { FindTeacherResponseDto } from './dto/teacher.dto';
import { students, teachers } from '../db';
import {
    StudentResponseDto,
    UpdateStudentDto,
} from 'src/student/dto/student.dto';

@Injectable()
export class TeacherService {
    private teachers = teachers;
    private students = students;

    getTeachers(): FindTeacherResponseDto[] {
        return this.teachers;
    }

    getTeacherById(teacherId: string): FindTeacherResponseDto {
        return this.teachers.find((teacher) => teacher.id === teacherId);
    }
}
