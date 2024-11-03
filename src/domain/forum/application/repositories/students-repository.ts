import { Student } from '../../enterprise/entities/student'

export interface StudentsRepository {
  create(student: Student): Promise<void>
  findByEmail(email: string): Promise<Student | null>
}
