import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { students } from '../../db';
@Injectable()
export class ValidStudentMiddleware implements NestMiddleware {
    use(req: Request, response: Response, next: NextFunction) {
        console.log('This middleware was called');
        const studentId = req.params.studentId;
        const studentExists = students.some(
            (student) => student.id === studentId,
        );

        if (!studentExists) {
            throw new NotFoundException('Student not found');
        }
        next();
    }
}
