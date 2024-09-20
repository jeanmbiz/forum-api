import { Question } from '../../entrerprise/entities/question'

export interface QuestionsRepository {
  // método create que vai receber uma Anser(entidade) e vai retornar uma Promise de void
  create(question: Question): Promise<void>
}
