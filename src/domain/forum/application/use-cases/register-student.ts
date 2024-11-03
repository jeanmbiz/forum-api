import { Either, left, right } from '@/core/either'
import { Student } from '../../enterprise/entities/student'
import { StudentsRepository } from '../repositories/students-repository'
import { StudentAlreadyExistsError } from './errors/student--already-exists-error'
import { HashGenerator } from '../cryptography/hash-generator'

interface RegisterStudentUseCaseRequest {
  name: string
  email: string
  password: string
}

// type Either: retorna ou sucesso ou erro
type RegisterStudentUseCaseResponse = Either<
  // caso de erro
  StudentAlreadyExistsError,
  // caso de sucesso
  {
    student: Student
  }
>

export class RegisterStudentUseCase {
  // dependência do repositody - contrato/interface
  constructor(
    private studentsRepository: StudentsRepository,
    // contrato para fazer o rash da senha cadastrada
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
    const studentWithSameEmail =
      await this.studentsRepository.findByEmail(email)

    if (studentWithSameEmail) {
      return left(new StudentAlreadyExistsError(email))
    }

    const hashedPassowrd = await this.hashGenerator.hash(password)

    // crio usuário
    const student = Student.create({
      name,
      email,
      password: hashedPassowrd,
    })

    // persiste usuário no banco de dados
    await this.studentsRepository.create(student)

    // right = retorno sucesso
    return right({ student })
  }
}
