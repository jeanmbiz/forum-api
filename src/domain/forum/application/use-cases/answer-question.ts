import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswersRepository } from '../repositories/answers-repository'
import { Answer } from '../../enterprise/entities/answer'
import { Either, right } from '@/core/either'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

// type Either: retorna ou sucesso ou erro
type AnswerQuestionUseCaseResponse = Either<
  // caso de erro
  null,
  // caso de sucesso
  {
    answer: Answer
  }
>

export class AnswerQuestionUseCase {
  // dependência do repositody - contrato/interface
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    await this.answersRepository.create(answer)

    // right = retorno sucesso
    return right({ answer })
  }
}
