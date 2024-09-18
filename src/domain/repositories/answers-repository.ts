import { Answer } from '../entities/answer'

export interface AnswersRepository {
  // método create que vai receber uma Anser(entidade) e vai retornar uma Promise de void
  create(answer: Answer): Promise<void>
}
