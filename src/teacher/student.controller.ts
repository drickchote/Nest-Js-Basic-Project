import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Put,
} from '@nestjs/common';
import {
    StudentResponseDto,
    UpdateStudentDto,
} from 'src/student/dto/student.dto';
import { TeacherService } from './teacher.service';
import { StudentService } from 'src/student/student.service';

@Controller('teachers/:teacherId/students')
export class StudentTeacherController {
    constructor(
        private readonly teacherService: TeacherService,
        private readonly studentService: StudentService,
    ) {}

    @Get()
    getStudents(@Param('teacherId') teacherId: string) {
        return this.studentService.getStudents(teacherId);
    }

    @Put(':studentId')
    updateStudentTeacher(
        @Param('teacherId', new ParseUUIDPipe()) teacherId: string,
        @Param('studentId', new ParseUUIDPipe()) studentId: string,
        @Body() body: UpdateStudentDto,
    ): StudentResponseDto {
        return this.studentService.updateStudentTeacher(
            teacherId,
            studentId,
            body,
        );
    }
}
