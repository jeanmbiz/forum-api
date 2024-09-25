import { AnswerComment } from '../../enterprise/entities/answer-comment'

export interface AnswerCommentsRepository {
  // método create que vai receber uma Anser(entidade) e vai retornar uma Promise de void
  create(answerComment: AnswerComment): Promise<void>
}
