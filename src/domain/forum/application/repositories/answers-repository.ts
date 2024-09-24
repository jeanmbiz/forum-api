import { Answer } from '../../enterprise/entities/answer'

export interface AnswersRepository {
  // método create que vai receber uma Anser(entidade) e vai retornar uma Promise de void
  create(answer: Answer): Promise<void>
  save(answer: Answer): Promise<void>
  findById(answerId: string): Promise<Answer | null>
  delete(answer: Answer): Promise<void>
}
