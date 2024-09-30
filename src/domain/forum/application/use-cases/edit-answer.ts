import { Either, left, right } from './../../../../core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

// type Either: retorna ou sucesso ou erro
type EditAnswerUseCaseResponse = Either<
  // caso de erro
  ResourceNotFoundError | NotAllowedError,
  // caso de sucesso
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  // dependência do repositody - contrato/interface
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      // left = retorno de erro
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      // left = retorno de erro
      return left(new NotAllowedError())
    }

    // edita o conteudo
    answer.content = content

    await this.answersRepository.save(answer)

    // right = retorno sucesso
    return right({ answer })
  }
}
