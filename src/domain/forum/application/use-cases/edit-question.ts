import { Either, left, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

// type Either: retorna ou sucesso ou erro
type EditQuestionUseCaseResponse = Either<
  // caso de erro
  ResourceNotFoundError | NotAllowedError,
  // caso de sucesso
  {
    question: Question
  }
>

export class EditQuestionUseCase {
  // dependência do repositody - contrato/interface
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      // left = retorno de erro
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      // left = retorno de erro
      return left(new NotAllowedError())
    }

    // edita o titulo e conteudo da pergunta
    question.title = title
    question.content = content

    await this.questionsRepository.save(question)

    // right = retorno sucesso
    return right({ question })
  }
}
