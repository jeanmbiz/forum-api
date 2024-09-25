import { QuestionComment } from '../../enterprise/entities/question-comment'

export interface QuestionCommentsRepository {
  // método create que vai receber uma Anser(entidade) e vai retornar uma Promise de void
  create(questionComment: QuestionComment): Promise<void>
}
