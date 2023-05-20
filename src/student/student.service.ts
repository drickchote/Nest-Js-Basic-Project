import { Injectable, NotFoundException } from '@nestjs/common';
import { students } from 'src/db';
import {
    CreateStudentDto,
    FindStudentResponseDto,
    StudentResponseDto,
    UpdateStudentDto,
} from './dto/student.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
    private students = students;

    getStudents(teacherId?: string): FindStudentResponseDto[] {
        if (!teacherId) {
            return this.students;
        }

        return this.students.filter((student) => student.teacher === teacherId);
    }

    getStudentById(studentId: string): FindStudentResponseDto {
        return this.students.find((student) => student.id === studentId);
    }

    createStudent(CreateStudentDto: CreateStudentDto): StudentResponseDto {
        const newStudent = {
            id: uuid(),
            ...CreateStudentDto,
        };

        this.students.push(newStudent);

        return newStudent;
    }

    updateStudent(
        studentId: string,
        updateStudentDto: UpdateStudentDto,
    ): StudentResponseDto {
        const foundedStudent = null;

        this.students = this.students.map((student) => {
            if (student.id === studentId) {
                return {
                    ...student,
                    ...updateStudentDto,
                };
            }
            return student;
        });

        return foundedStudent;
    }

    updateStudentTeacher(
        teacherId: string,
        studentId: string,
        updateStudentDto: UpdateStudentDto,
    ): StudentResponseDto {
        let foundedStudent = null;

        this.students = this.students.map((student) => {
            if (student.id === studentId && student.teacher === teacherId) {
                foundedStudent = { ...student, ...updateStudentDto };
                return foundedStudent;
            }
            return student;
        });

        return foundedStudent;
    }
}
